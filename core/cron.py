#!/usr/bin/python
# -*- coding: utf-8 -*-

import MySQLdb as mysql
import datetime
import argparse
import ConfigParser
from db_handle import Credentials

def main():
	return

def hourly():
	print "This is hourly"
	return

def daily():
	now = datetime.datetime.now()
	now_ts = now.strftime("%Y-%m-%d")+"%"
	creds = Credentials()
	con = mysql.connect(creds["server"], creds["user"], creds["pw"], creds["db"], port=creds["port"])
	cur = con.cursor()
	cur.execute("SELECT Zeit, Temperatur FROM  `Minuten` WHERE Zeit LIKE %s ORDER BY `Minuten`.`Temperatur` DESC LIMIT 1", [now_ts])
	con.commit()
	Tmax = cur.fetchone()[1]
	cur.execute("SELECT Zeit, Feuchte FROM  `Minuten` WHERE Zeit LIKE %s ORDER BY `Minuten`.`Temperatur` DESC LIMIT 1", [now_ts])
	con.commit()
	Hmax = cur.fetchone()[1]
	cur.execute("INSERT INTO Tage(Tmax,Hmax) VALUES(%s,%s)", [Tmax, Hmax])
	con.commit()
	con.close()
	return

if __name__ == '__main__':
	parser = argparse.ArgumentParser(description=u'Cronjob-Funktionen für TempPi')
	parser.add_argument("job", help=u'Cronjob der ausgefuehrt werden soll.')
	args = parser.parse_args()

	funcs = {
		'daily': daily,
		'hourly': hourly,
	}

	funcs[args.job]()
	