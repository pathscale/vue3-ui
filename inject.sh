#!/bin/bash

# Vue3-UI does not comes with examples nor a test environment where you could use components
# For this purpose you can take a look at vue3-starter or some end user project that uses vue3-ui
#
# Aditionally, if you wish to have available on such project components that are local
# Invoke this script with the name of such component and it will inject the lastest bundle into that project

# For example
# ./inject.sh my-dev-environment
# will copy inject the latest local bundle into ../my-dev-environment/node_modules/@pathscale/vue3-ui/dist/

if [ -z $1 ]
then
    echo "expected project name where the bundle should be injected"
    exit
fi

npm run build
echo "bundle created"

cp ./dist/* ../$1/node_modules/@pathscale/vue3-ui/dist/

if [ $? -eq 0 ]; then
   echo "bundle injected into $1"
else
   echo "there was a problem injecting bundle into $1"
fi
