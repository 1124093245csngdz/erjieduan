<?php
# page =  2 

# 链接数据库
$db = mysqli_connect("127.0.0.1","root","","gome");

# 查询获取数据库中的数据
# page 1 = 0,20
# page 2 = 20,20
# page 3 = 40,20
$start = ($_REQUEST["page"] - 1) * 30;
// $type = $_REQUEST["sortType"];
$sql = "SELECT * FROM datas LIMIT $start ,30";


$result = mysqli_query($db,$sql);

$data = mysqli_fetch_all($result,MYSQLI_ASSOC);
// print_r($data);

# 如果1 0~19
# 如果2 20~39

# 把数据转换为JSON返回
echo json_encode($data,true);
?>