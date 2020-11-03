#!/bin/bash
rm -rf $TMPDIR/metro-bundler-cache-*
touch rn_lib/rn-pak-ble/android/CMakeLists.txt
watchman watch-del-all
npx react-native start -- --reset-cache

