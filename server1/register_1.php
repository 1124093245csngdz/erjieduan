<?php
//接收前端发过来的数据
    $username = $_REQUEST["username"];
    $password = $_REQUEST["password"];
    //链接数据库
    $db = mysqli_connect("127.0.0.1","root","","login");
    // $sql = "INSERT INTO `login`.`infos` (`id` ,`account` ,`password`) VALUES (null, '$username', '$password')";
    // SELECT * FROM `infos` WHERE `account` LIKE 'zs' LIMIT 0 , 30
    //查询数据库中是否有指定数据
    $sql1 = "SELECT * FROM `infos` WHERE `account` = '$username'";
    // mysqli_query($db, $sql);
    
    $result = mysqli_query($db,$sql1);
    // $abb = mysqli_num_rows($result);
    //创建对象
    $obj = array("status"=>"", "data"=>array("msg"=>""));
    // echo $abb;
    if(mysqli_num_rows($result) == 1)
{
    $obj["status"] = "error";
    $obj["data"]["msg"] = "注册失败，该用户名已经被使用！！！";
}else
{
    $sql = "INSERT INTO `login`.`infos` (`id` ,`account` ,`password`) VALUES (null, '$username', '$password')";
  # 执行SQL语句
    mysqli_query($db, $sql);

     $obj["status"] = "success";
     $obj["data"]["msg"] = "恭喜您，注册成功！！！";
}

    echo json_encode($obj,true);
?>