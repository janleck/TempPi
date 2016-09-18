#!/usr/bin/python
# -*- coding: utf-8 -*-

import MySQLdb as mysql
from bottle import Bottle, PasteServer, static_file, route, run, template, request, redirect, response, TEMPLATE_PATH
import datetime
import json
import ConfigParser

def Credentials():
	c = ConfigParser.ConfigParser()
	c.read('core/pw.cfg')
	creds = c.defaults()
	creds['port'] = int(creds['port']) 
	# Config in Dict packen:
	return creds

def getMittelwert(arr):
	if len(arr):
		return reduce(lambda x, y: x + y, arr) / len(arr)
	else:
		return 0


if __name__ == "__main__":
	# Global Variables
	app = Bottle()
	TEMPLATE_PATH.insert(0,'gui')

	# - enable cross-Browser Requests
	def enable_cors(fn):
		def _enable_cors(*args, **kwargs):
			response.headers['Access-Control-Allow-Origin'] = '*'
			response.headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS, PUT'
			response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token'
			if request.method != 'OPTIONS':
				# actual request; reply with the actual response
				return fn(*args, **kwargs)
		return _enable_cors

	# Static Files
	@app.route('/<filename:re:.*\.*>')
	def stylesheets(filename):
		return static_file(filename, root='gui')
#	@app.route('/<filename:re:.*\.(jpg|png|gif|ico)>')
#	def images(filename):
#		return static_file(filename, root='img')
#	@app.route('/<filename:re:.*\.js>')
#	def images(filename):
#		return static_file(filename, root='js')

	# Routings
	@app.route('/')
	@enable_cors
	def thisIsMe():
		return template("index.htm")

	@app.route('/now')
	@enable_cors
	def getNow():
		creds = Credentials()
		con = mysql.connect(creds["server"], creds["user"], creds["pw"], creds["db"], port=creds["port"])
		cur = con.cursor()
		cur.execute("SELECT Zeit, Temperatur, Feuchte FROM  Minuten ORDER BY Zeit DESC LIMIT 1")
		con.commit()
		r = cur.fetchone()
		con.close()
		returnObj = {
			'Z':r[0].strftime("%A %d. %B - %H:%M"),
			'T':str(round(r[1],1)),
			'H':str(round(r[2],1)),
		}
		return returnObj

	@app.route('/hours')
	@enable_cors
	def today():
		# Neuesten Zeitstempel finden
		creds = Credentials()
		con = mysql.connect(creds["server"], creds["user"], creds["pw"], creds["db"], port=creds["port"])
		cur = con.cursor()
		cur.execute("SELECT Zeit FROM  Minuten ORDER BY Zeit DESC LIMIT 1")
		con.commit()
		r = cur.fetchone()
		aktTS = r[0].strftime("%Y-%m-%d ")
		aktS = int(r[0].strftime("%H"))
		if aktS < 1:
			return ""
		# Stundenweise abfragen:
		returnObj = {}
		startH = aktS-14
		startH = startH if startH > 0 else 1
		for x in range(startH,aktS):
			cur.execute("SELECT Temperatur, Feuchte FROM Minuten WHERE Zeit > %s AND Zeit < %s", [aktTS+str(x-1), aktTS+str(x)])
			con.commit()
			returnObj[x] = {'T':0, 'H':0}
			arrT = []
			arrH = []
			for row in cur:
				arrT.append(row[0])
				arrH.append(row[1])
			returnObj[x]['T'] = getMittelwert(arrT)
			returnObj[x]['H'] = getMittelwert(arrH)
		r = json.dumps(returnObj)
		return r
	
	
	@app.route('/maxday')
	@enable_cors
	def maxDay():
		creds = Credentials()
		con = mysql.connect(creds["server"], creds["user"], creds["pw"], creds["db"], port=creds["port"])
		cur = con.cursor()
		cur.execute("SELECT Zeit,Tmax,Hmax FROM Tage ORDER BY Zeit DESC LIMIT 7")
		con.commit()
		result = {}
		for row in cur:
			tag = row[0].strftime("%a")
			result[tag]={"H": row[2], "T": row[1]}
		con.close()
		r = json.dumps(result)
		return r


	# Start Service
	run(app, host='0.0.0.0', port=8080, server=PasteServer, debug=True, reloader=True)
