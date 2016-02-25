#!/bin/bash


init() 
{
  echo "> first npm install"
  npm install
  echo "all the node modules are installed"

  echo "> then bower install"
  bower install
  echo "bower install is done"
  echo
  echo "> now we run gulp to copy libraries to the correct spot"
  gulp libscripts
  echo "done"

  echo
  echo "> compile our scripts"
  gulp scripts

  echo "> now compile the stylesheets for the first time"
  gulp sass

  echo "now run gulp watch to watch the changes, that's all"
  gulp
}


# inform what we are going to do
printf  "we are going to setup the frontend dependencies for this project [Y / N] (default: N): "
read yn

if [ $yn = "Y" -o $yn = "y" ]
then
  echo "setting everything up, go stretch your legs, this will take some time"
  init
else
  echo "cancelling"
  exit 0
fi
