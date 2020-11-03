#!/bin/bash
#sudo lsof -n -i4TCP:8081 # get the process' PID
#sudo launchctl list | grep 5693 # find the launchd endpoint
sudo launchctl remove com.mcafee.agent.macmn 
