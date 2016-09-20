#!/usr/bin/python
# -*- coding: utf-8 -*-

import MySQLdb as mysql
import spidev
import time
import db_handle
from mysensors import *


if __name__ == "__main__":
	intervall = 60*15 # (15 Minuten)
	TEMP = Temperatur(1, intervall, runden=3)
	HUM = Feuchtigkeit(0, TEMP.wert, intervall, runden=3)
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
