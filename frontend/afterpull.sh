#!/bin/bash

bash -c '[ -d bower_components ] && rm -rf bower_components/'

bower install && gulp sass && gulp libscripts && gulp scripts && gulp templates
echo "done"
