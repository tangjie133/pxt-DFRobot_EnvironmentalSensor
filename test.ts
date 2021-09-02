// 在此处测试；当此软件包作为插件使用时，将不会编译此软件包。
/*
while (DFRobot_EnvironmentalSensor.beging(eEquipment.DEVICE_PID_GRAVITY) == false) {
    serial.writeLine("Sensor initialize failed!!")
    basic.pause(500)
}
serial.writeLine("Sensor  initialize success!!")
basic.pause(500)
basic.forever(function () {
    serial.writeLine("---------------------------------------")
    serial.writeLine("Temp: " + DFRobot_EnvironmentalSensor.getTemperature(eTemp.TEMP_C) + " C")
    serial.writeLine("Temp: " + DFRobot_EnvironmentalSensor.getTemperature(eTemp.TEMP_F) + " F")
    serial.writeLine("Humidity: " + DFRobot_EnvironmentalSensor.getHumidity() + " %")
    serial.writeLine("Ultraviolet intensity: " + DFRobot_EnvironmentalSensor.getUltravioletIntensity() + " mw/cm2")
    serial.writeLine("LuminousIntensity: " + DFRobot_EnvironmentalSensor.getLuminousIntensity() + " lx")
    serial.writeLine("Atmospheric pressure: " + DFRobot_EnvironmentalSensor.getAtmospherePressure(eAtmosphericPressureUnit.HPA) + "HAP")
    serial.writeLine("Atmospheric pressure: " + DFRobot_EnvironmentalSensor.getAtmospherePressure(eAtmosphericPressureUnit.KPA) + "KPA")
    serial.writeLine("Elevation: " + DFRobot_EnvironmentalSensor.getElevation() + "m")
    serial.writeLine("---------------------------------------")
    basic.pause(500)
})*/
