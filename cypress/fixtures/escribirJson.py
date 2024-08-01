import fileinput
import requests
from bs4 import BeautifulSoup

import random


def obtenerIccid():
    # se hace la peticion get
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36"
    }
    page = requests.get(
        "https://www.fakepersongenerator.com/imei-generator#google_vignette",
        headers=headers,
    )
    soup = BeautifulSoup(page.text, "html.parser")
    span = soup.find_all("span")
    imeis = []
    for quote_element in span:
        # extract the text of the quote
        text = quote_element.find("span", class_="text")
        # print(quote_element)
        for tag in quote_element:
            imeis.append(tag)
    imeis.remove("Mobile Brand:")
    imeis.remove("Quantity:")
    print(imeis)
    return imeis

    # while():


"""
def navegador():
    from selenium import webdriver


    from selenium.webdriver.common.by import By
    from selenium.webdriver.common.keys import Keys

    browser = webdriver.Edge()

    browser.get("http://www.google.com")
    #assert "Yahoo" in browser.title

    elem = browser.find_element(By.NAME, "textarea")  # Find the search box
    elem.send_keys("seleniumhq" + Keys.RETURN)

    #browser.quit()
"""
'''
def validarNumeroRepetido():
    numeroAleatorio = generarIccidAleatorio()
    # numeroAleatorio=3
    archivo = open("numero.txt")
    # numeroArchivo=archivo.readline()
    numeroArchivo = archivo.readline()
    print("N ar:" + str(numeroArchivo) + " | " + "N al: " + str(numeroAleatorio))
    archivo.close()
    # si el numero es repetido, se genera otro y se almacena el nuevo número
    if str(numeroAleatorio) == str(numeroArchivo):
        numeroAleatorio = generarIccidAleatorio()

        archivo = open("numero.txt", "w")
        archivo.write(str(numeroAleatorio))
        archivo.close()
    else:
        archivo = open("numero.txt", "w")
        archivo.write(str(numeroAleatorio))
        archivo.close()
    return numeroAleatorio
'''


def generarIccidAleatorio():
    numero = random.randint(10000000000000000000, 99999999999999999999)
    return numero

def generarNumeroTelefonoAleatorio():
    numero = random.randint(1000000000, 9999999999)
    return numero

def generarNumero6Cifras():
    numero = random.randint(1, 9999999)
    return numero

def generarImeiAleatorio():
    numero = random.randint(100000000000000, 999999999999999)
    return numero

def generarVinAleatorio():
    numero = random.randint(100000000000000, 999999999999999)
    return numero


def llenardatos(archivo,campoBuscar, numero):
    for line in fileinput.FileInput(archivo+".json", inplace=1):
        if line.startswith(campoBuscar):
            new_line = line.replace(line, campoBuscar + str(numero) + '"' + ",")
            print(new_line)
        else:
            print(line, end="")

def menu():
    #PROVIDER
    campos = ['    "nombreValido":"']
    iccidAleatorio = generarIccidAleatorio()
    numero = generarNumero6Cifras()
    archivo="provider"
    llenardatos(archivo,campos[0], "Provider "+str(numero))

    #COSTUMER
    campos = ['    "nombreValido":"']
    numero1 = generarNumero6Cifras()
    archivo="costumer"
    llenardatos(archivo,campos[0], "Costumer "+str(numero))

    #LOCATION
    campos = ['    "nombreValido":"']
    numero = generarNumero6Cifras()
    archivo="location"
    llenardatos(archivo,campos[0], "Location "+str(numero))

    #PURCHASE ORDER
    campos = ['   "serialValida":"']
    numero = generarImeiAleatorio()
    archivo="purchaseOrder"
    llenardatos(archivo,campos[0], numero)

    #MONITORING DEVICES
    campos = ['    "nombreValido":"']
    numero = generarNumero6Cifras()
    archivo="monitoringDevices"
    llenardatos(archivo,campos[0], "Dispositivo "+str(numero))

    #SALE ORDER
    campos = [
        '    "serial1":"',
        '    "serial2":"',
        '    "serial3":"',
        '    "serial4":"',
        '    "serial5":"',
        '    "serial6":"',
        '    "serial7":"',
        '    "serial8":"',
    ]
    i=0
    archivo="saleOrder"
    while i<2:
        numero = generarIccidAleatorio()
        llenardatos(archivo,campos[i], numero)
        i+=1
    i=2
    while i<8:
        numero2 = generarImeiAleatorio()
        llenardatos(archivo,campos[i], numero2)
        i+=1

    #SIM CARD
    campos = ['    "iccidValida":"', '    "numeroTelefonoValida":"']
    numero = generarIccidAleatorio()
    numero2 = generarNumeroTelefonoAleatorio()
    archivo="simCard"
    llenardatos(archivo,campos[0], numero)
    llenardatos(archivo,campos[1], numero2)

    #TRACKER
    campos = [
        '    "iccidValida":"',
        '    "serialGPS":"',
        '    "numeroValida":"',
    ]
    numero = generarIccidAleatorio()
    numero2 = generarImeiAleatorio()
    numero3 = generarNumeroTelefonoAleatorio()
    archivo="tracker"
    llenardatos(archivo,campos[0], numero)
    llenardatos(archivo,campos[1], numero2)
    llenardatos(archivo,campos[2], numero3)

    #VEHICLE
    campos = ['    "vinValido":"']
    numero = generarVinAleatorio()
    llenardatos(archivo,campos[0], "D"+str(numero)+"E")

    #TRACKER INSTALLATIONS
    campos = [
        '    "modelo":"',
        '    "iccidValida":"',
        '    "serialGPS":"',
        '    "numeroValida":"',
        '    "vinValido":"'
        ]
    numero = generarNumero6Cifras()
    numero2 = generarIccidAleatorio()
    numero3 = generarImeiAleatorio()
    numero4 = generarNumeroTelefonoAleatorio()
    numero5 = generarVinAleatorio()
    archivo="trackerInstallations"
    llenardatos(archivo,campos[0], "Boton de panico "+str(numero))
    llenardatos(archivo,campos[1], str(numero2))
    llenardatos(archivo,campos[2], str(numero3))
    llenardatos(archivo,campos[3], str(numero4))
    llenardatos(archivo,campos[4], "D"+str(numero5)+"E")


menu()
