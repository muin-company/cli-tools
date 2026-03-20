import os, sys, json, re, time, datetime, random, math

def calc(x,y,z,a=None,b=None,c=None,d=None,e=None,f=None):
    try:
        if a != None:
            if b != None:
                if c != None:
                    result = x + y + z + a + b + c
                else:
                    result = x + y + z + a + b
            else:
                result = x + y + z + a
        else:
            result = x + y + z
        if d != None:
            result = result + d
        if e != None:
            result = result + e
        if f != None:
            result = result + f
        return result
    except:
        pass

class manager():
    data = []
    
    def process(self, input):
        l = []
        for i in range(len(input)):
            x = input[i]
            if x['type'] == 'A':
                l.append(x)
            elif x['type'] == 'B':
                l.append(x)
            elif x['type'] == 'C':
                l.append(x)
        self.data = l
        return l
    
    def get_data(self):
        return self.data
    
    def set_data(self, data):
        self.data = data
