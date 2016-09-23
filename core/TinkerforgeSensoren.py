from tinkerforge.ip_connection import IPConnection
from tinkerforge.bricklet_temperature import BrickletTemperature

class TinkerforgeSensor(object):
    
    def __init__(self, uid, int_MW=9,Acc=4, host='localhost', port='4223'):
        self.Acc = Acc
		self.int_MW = int_MW
        self.uid = uid
        self.host = host
        self.port = port
        self.wert = 0
        self.werte = []
        self.mittelwert = 0
        self.ipconnection = IPConnection()
        self.sensor = initSensor()
    
    def initSensor(self):
        pass

    def ReadValue(self):
        pass

    def Update(self):
        self.ReadValue()
        if len(self.werte) == self.int_MW:
            self.Mittelwert()
            self.werte = []

    def Mittelwert(self):
        self.mittelwert = reduce(lambda x, y: x + y, self.werte) / len(self.werte)

class TinkerforgeTemperature(TinkerforgeSensor):

    def initSensor(self):
        s = BrickletTemperature(self.uid, self.ipconnection)
        self.ipconnection.connect(self.host, self.port)
        return s

    def ReadValue(self):
        self.wert = self.sensor.get_temperature() / 100
        self.ipconnection.disconnect()

class TinkerforgeHumidity(TinkerforgeSensor):

    def initSensor(self):
        s = BrickletHumdity(self.uid, self.ipconnection)
        self.ipconnection.connect(self.host, self.port)
        return s

    def ReadValue(self):
        self.wert = self.sensor.get_humidity() / 10
        self.ipconnection.disconnect()