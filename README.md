# TempPi

TempPi liest in einem regelmäßigen Intervall von Sensoren aus und speichert sie in eine Datenbank.

Gedacht ist das System dann als Standalone Lösung für die Anzeige dieser Werte auf einer grafischen Oberfläche. Dabei wird die anzeige unter <code>http://localhost:8080</code> angezeigt.

## Vorraussetzungen

### Monitor über HDMI (nur für Standalone-Betrieb)

### RaspberryPi 2 < (für GPIO-Support)

Vorzugsweise mit Raspbian Jessie

### Bradboard, Verkabelung, Sensoren

Nur für Anschlüsse an die GPIO Schnittstelle

### Tinkerforgelib

Um die USB-Module mit Python ansteuern zu können:

- Auf <a href='http://www.tinkerforge.com/de/doc/Downloads.html'>http://www.tinkerforge.com/de/doc/Downloads.html</a> die Bindings für Python herunterladen.
- Im Verzeichnis der Bindings `sudo python setup.py install` ausführen.

Installation des Brick-Deamons auf dem Raspberry Pi

`sudo apt-get install libusb-1.0-0 libudev0 pm-utils`
`wget http://download.tinkerforge.com/tools/brickd/linux/brickd_linux_latest_armhf.deb`
`sudo dpkg -i brickd_linux_latest_armhf.deb`

## Device Support

### GPIO

- Temperatursensor
- Feuchtigkeitssensor

### Tinkerforge

- Temperatursensor
- Feuchtigkeitssensor
