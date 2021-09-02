
/**
* 使用此文件来定义自定义函数和图形块。
* 想了解更详细的信息，请前往 https://makecode.microbit.org/blocks/custom
*/
//设备选择枚举
enum eEquipment {
    //% block="SEN0501"
    DEVICE_PID_GRAVITY = 0x01F5,
    //% block="SEN0500"
    DEVICE_PID_BREAKOUT = 0X01F4
}
//大气压强单位选择枚举
enum eAtmosphericPressureUnit {
    //% block="HPA"
    HPA = 0x01,
    //% block="KPA"
    KPA = 0x02
}
//温度单位选择枚举
enum eTemp {
    //% block="TEMP_C"
    TEMP_C = 0X03,
    //% block="TEMP_F"
    TEMP_F = 0X04
}

/**
 * Custom blocks
 */
//% weight=100 color=#0fbc11 icon="" block="DFRobot EnvironmentalSensor"
namespace DFRobot_EnvironmentalSensor {
    const SEN050X_DEFAULT_DEVICE_ADDRESS = 0x22//设备地址
    const DEVICE_VID = 0x3343//厂商标识

    const REG_PID = 0x0000 //协议转换板的寄存器
    const REG_VID = 0x0001 //协议转换板的寄存器
    const REG_DEVICE_ADDR = 0x0002 //协议转换板的寄存器
    const REG_UART_CTRL0 = 0x0003 //协议转换板的寄存器
    const EG_UART_CTRL1 = 0x0004 //协议转换板的寄存器
    const REG_VERSION = 0x0005 //协议转换板的寄存器

    const REG_ULTRAVIOLET_INTENSITY = 0x0008 //协议转换板的寄存器
    const REG_LUMINOUS_INTENSITY = 0x0009 //协议转换板的寄存器
    const REG_TEMP = 0x000A //协议转换板的寄存器
    const REG_HUMIDITY = 0x000B //协议转换板的寄存器
    const REG_ATMOSPHERIC_PRESSURE = 0x000C //协议转换板的寄存器
    const REG_ELEVATION = 0x000D //协议转换板的寄存器

    /**
     * TODO: 初始化传感器，判断设备是否正确
     */
    //% weight=99
    //% block="beging %eqipment"
    export function beging(eqipment: eEquipment): boolean {
        // Add code here
        if (detectDeviceAddress(SEN050X_DEFAULT_DEVICE_ADDRESS) != 0)
            return false;

        if (getDevicePID() != eqipment)
            return false;

        if (getDeviceVID() != DEVICE_VID)
            return false;

        return true;
    }
    /**
     * TODO: 获取SEN050X温度数据
     *
     * @param units 返回数据单位选择
     * @n     TEMP_C:摄氏度
     * @n     TEMP_F:华氏度
     *
     * @return 返回获取的温度数据
     */
    //% weight=80
    //% block="Get temperature %unist"
    export function getTemperature(unist: eTemp): string {
        let buf = pins.createBuffer(2);
        buf = readReg(REG_TEMP);
        let data = buf[0] << 8 | buf[1];
        if (data >= 4500) {
            data -= 4500;
            data = data / 100 + ((data % 100) * 0.01);
        } else {
            data -= 4500;
            data = data / 100 + (data % 100) * 0.01;
        }
        if (unist == eTemp.TEMP_F) {
            data = data * 1.8 + 32;
        }
        let index = data.toString().indexOf(".");
        let temp: string = data.toString().substr(0, index + 3)
        return temp;
    }
    /**
     * TODO: 获取SEN050X湿度数据
     *
     * @return 返回获取的湿度数据
     */
    //% weight=70
    //% block="Get humidity"
    export function getHumidity(): number {
        let buf = pins.createBuffer(2);
        buf = readReg(REG_HUMIDITY);
        let humidity = buf[0] << 8 | buf[1];
        return humidity;
    }
    /**
     * TODO: 获取SEN050X紫外线强度指数数据
     *
     * @return 返回获取的紫外线强度指数数据
     */
    //% weight=60
    //% block="Get ultraviolet intensity"
    export function getUltravioletIntensity(): string {
        let buf = pins.createBuffer(2);
        buf = readReg(REG_ULTRAVIOLET_INTENSITY);
        let data = buf[0] << 8 | buf[1];
        data = (data / 100) + (data % 100) * 0.01;
        let index = data.toString().indexOf(".");
        let ultraviolet: string = data.toString().substr(0, index + 3)
        return ultraviolet;
    }
    /**
     * TODO: 获取SEN050X光线强度数据
     *
     * @return 返回获取的光线强度数据
     */
    //% weight=50
    //% block="Get luminous intensity"
    export function getLuminousIntensity(): number {
        let buf = pins.createBuffer(2);
        buf = readReg(REG_LUMINOUS_INTENSITY);
        let humidity = buf[0] << 8 | buf[1];
        return humidity;
    }
    /**
     * TODO: 获取SEN050X大气压强数据
     *
     * @param units 返回数据单位选择
     * @n            HPA:百帕
     * @n            KPA:千帕
     * @return 返回获取的大气压强数据
     */
    //% weight=40
    //% block="Get atmospheric pressure %unist"
    export function getAtmospherePressure(units: eAtmosphericPressureUnit): number {
        let buf = pins.createBuffer(2);
        buf = readReg(REG_ATMOSPHERIC_PRESSURE);
        let atmosphere = buf[0] << 8 | buf[1];
        if (units == eAtmosphericPressureUnit.KPA)
            atmosphere /= 10;
        return atmosphere;
    }
    /**
     * TODO: 获取SEN050X海拔数据
     *
     * @return 返回获取的海拔数据
     */
    //% weight=30
    //% block="Get elevation"
    export function getElevation(): number {
        let buf = pins.createBuffer(2);
        buf = readReg(REG_ELEVATION);
        let elevation = buf[0] << 8 | buf[1];
        return elevation;
    }
    /**
     * TODO: 判断设备地址是否正确
     * @param addr: 设备地址
     */
    function detectDeviceAddress(addr: number): number {
        let buf = pins.createBuffer(2);
        buf = readReg(REG_DEVICE_ADDR);
        if (addr != (buf[0] << 8 | buf[1]))
            return -1;
        return 0
    }
    /**
     * TODO: 获取设备PID
     */
    function getDevicePID(): number {
        let buf = pins.createBuffer(2);
        buf = readReg(REG_PID);
        let data = buf[0] << 8 | buf[1];
        return data;
    }
    /**
     * TODO: 获取设备VID
     */
    function getDeviceVID(): number {
        let buf = pins.createBuffer(2);
        buf = readReg(REG_VID);
        let data = buf[0] << 8 | buf[1];
        return data
    }

    function readReg(reg: number): Buffer {
        pins.i2cWriteNumber(SEN050X_DEFAULT_DEVICE_ADDRESS, (reg * 2), NumberFormat.UInt8LE, false);
        return pins.i2cReadBuffer(SEN050X_DEFAULT_DEVICE_ADDRESS, 2);
    }
}
