#!/bin/bash
 
#pid 文件
pid_file=front.pid
start_command="node app.js"

#使用说明，用来提示输入参数
usage() {
    echo "Usage: sh front.sh [start|stop|restart|status]"
    exit 1
}
 
#检查程序是否在运行
#grep -v反选匹配 awk指定文件某一行
is_exist(){
  pid=$(cat ${pid_file})
  pid_exists=$(ps aux | awk '{print $2}'| grep -w $pid)
  echo "front.pid : pid=$pid"
  #如果不存在返回1，存在返回0    
  if [ ! $pid_exists ]; then
   return 1
  else
    return 0
  fi
}
 
#启动方法
start(){
  is_exist
  if [ $? -eq 0 ]; then
    echo "Front is already running. pid=${pid}"
  else
    nohup ${start_command} > front.log 2>&1 &
    if [[ $? -eq 0 ]]; then
      echo "Front is running. Pid=$!"
      echo $! > ${pid_file}
    fi
  fi
}
 
#停止方法
stop(){
  is_exist
  if [ $? -eq "0" ]; then
    kill -TERM $pid
  else
    echo "Front is not running"
  fi 
}
 
#输出运行状态
status(){
  is_exist
  if [ $? -eq "0" ]; then
    echo "Front is running. Pid is ${pid}"
  else
    echo "Front is NOT running."
  fi
}
 
#重启
restart(){
  stop
  sleep 5
  start
}
 
#根据输入参数，选择执行对应方法，不输入则执行使用说明
case "$1" in
  "start")
    start
    ;;
  "stop")
    stop
    ;;
  "status")
    status
    ;;
  "restart")
    restart
    ;;
  *)
    usage
    ;;
esac