from flask import Flask, render_template
import os
app = Flask(__name__)
@app.route('/', methods=['POST', 'GET'])
def root():
   markers=[
   {
   'lat':  14.6898,
   'lon': -17.4480,
   'popup':'Sengal, Dakar.'
}
   ]
   return render_template('index.html',markers=markers)
if __name__ == '__main__':
   port = int ( os.environ . get ( 'PORT' , 5000 ))
   app.run ( debug = True , host = '0.0.0.0' , port = port)
