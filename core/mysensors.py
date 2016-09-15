#!/usr/bin/python
# -*- coding: utf-8 -*-

import spidev

class analoger_Sensor(object):
	"""einzelner Sensor"""
	def __init__(self, Channel, int_MW=9, Acc=4):
		self.Acc = Acc
		self.int_MW = int_MW
		self.einheit = ""
		self.werte = []
		self.mittelwert = 0
		self.Channel = Channel
		self.ReadChannel()
		self.ConvertVolts()
		self.beschreibung = "ein analoger Sensor"

	def __str__(self):
		s = """
		{}:
		(gelesen aus Kanal {})
		ADC: {}
		Volt: {} V
		Mittelwert: {} {}
		(Werte: {})
		""".format(self.beschreibung, self.Channel, self.s_val, self.s_volts, self.mittelwert, self.einheit,  ", ".join(map(str, self.werte)))
		return s

	def ReadChannel(self):
		"""Der Kanal liegt zwischen 0 und 7 (0 = Feuchtigkeit, 1 = Temperatur (innen), 2 = Temperatur (aussen))"""
		spi = spidev.SpiDev()
		spi.open(0, 0)
		adc = spi.xfer2([1, (8 + self.Channel) << 4, 0])
		data = ((adc[1] & 3) << 8) + adc[2]
		spi.close()
		self.s_val = data

	def ConvertVolts(self):
		"""Umwandlung des digitalen ADC-Wertes in Volt (Places nimmt die erwarteten Nachkommastellen an)"""
		volts = (3.3 / 1023)*self.s_val
		volts = round(volts,self.Acc)
		self.s_volts = volts

	def VoltsToWert(self):
		self.wert = 0

	def Update(self):
		self.ReadChannel()
		self.ConvertVolts()
		self.VoltsToWert()
		self.werte.append(self.wert)
		if len(self.werte) == self.int_MW:
			self.Mittelwert()
			self.werte = []

	def Mittelwert(self):
		self.mittelwert = reduce(lambda x, y: x + y, self.werte) / len(self.werte)



class Temperatur(analoger_Sensor):
	"""Sensordaten zur Temperatur"""
	def __init__(self, Channel, int_MW, runden=2):
		super(Temperatur, self).__init__(Channel, int_MW)
		self.runden = runden
		self.beschreibung = "Temperatursensor"
		self.einheit = "°C"
		self.Update()

	def VoltsToWert(self):
		# Umwandlung der Voltzahl in Grad Celcius (Places nimmt die erwarteten Nachkommastellen an)
		kelvin = self.s_volts/0.01
		celcius = round(kelvin-273.15, self.runden)
		self.wert = celcius
		

class Feuchtigkeit(analoger_Sensor):
	"""Sensordaten zur Feuchtigkeit"""
	def __init__(self, Channel, Temp, int_MW, runden=2):
		super(Feuchtigkeit, self).__init__(Channel, int_MW)
		self.runden = runden
		self.beschreibung = "Feuchtigkeitssensor"
		self.einheit = "% rel."
		self.temp = Temp
		self.Update()
	
	def VoltsToWert(self):
		"""relative Luftfeuchtigkeit ermittelt (Places nimmt die erwarteten Nachkommastellen an)"""
		if self.temp <= 22.5:
			humm = (self.s_volts - 0.128) / 0.0286
		elif self.temp > 22.5 and self.temp <= 27.5:
			humm = (self.s_volts - 0.085) / 0.0294
		else:
			humm = (self.s_volts - 0.038) / 0.0296
		humm = round(humm, self.runden)
		self.wert = humm


if __name__ == "__main__":
	Temp = Temperatur(1)
	Hum = Feuchtigkeit(0, Temp.wert)

	print Temp
	print Hum
