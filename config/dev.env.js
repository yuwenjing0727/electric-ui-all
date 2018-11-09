'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
/*NODE_ENV : '"http://192.168.100.119:9999"'//郑建阳*/
	/*NODE_ENV : '"http://192.168.100.122:9999"'//宋章勇*/
/*	NODE_ENV : '"http://192.168.100.119:9999"'*/
	/*NODE_ENV : '"http://172.20.10.13:9999"'*/
/*	NODE_ENV : '"http://192.168.12.170:9999"'*/
	NODE_ENV : '"http://192.168.100.115:9999"'

})
