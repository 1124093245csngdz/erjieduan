<?php
$db = mysqli_connect("127.0.0.1","root","","gome");

//查询数据
$sql = "SELECT * FROM datas";
$result = mysqli_query($db,$sql);
$total = mysqli_num_rows($result);

$count = ceil($total  / 30);

# 返回
$data  = array("count"=>$count);  
echo json_encode($data,true);
?>