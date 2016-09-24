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

<pre><code>sudo apt-get install</code></pre>



## Device Support

### GPIO

- Temperatursensor
- Feuchtigkeitssensor

### Tinkerforge

- Temperatursensor
- Feuchtigkeitssensor
