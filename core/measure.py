#!/usr/bin/python
# -*- coding: utf-8 -*-

import MySQLdb as mysql
import spidev
import time
import db_handle
import ConfigParser
from TinkerforgeSensoren import *


if __name__ == "__main__":
	c = ConfigParser.ConfigParser()
	c.read('./pw.cfg')
	uids = c.defaults()

	intervall = 60*15 # (15 Minuten)
	TEMP = TinkerforgeTemperature(uids['temperature'],intervall)
	HUM = TinkerforgeHumidity(uids['humidity'],intervall)

	i = 0

	creds = db_handle.Credentials()

	while True:
		time.sleep(1)
		i += 1
		TEMP.Update()
		HUM.Update()
		if i == intervall:
			con = mysql.connect(creds["server"], creds["user"], creds["pw"], creds["db"], port=creds["port"])
			cur = con.cursor()
			cur.execute("INSERT INTO Minuten (Temperatur, Feuchte) VALUES (%s, %s)",[TEMP.mittelwert, HUM.mittelwert])
			con.commit()
			con.close()
			i = 0
