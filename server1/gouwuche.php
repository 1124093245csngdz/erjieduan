<?php
$db = mysqli_connect("127.0.0.1", "root", "", "gome");
//接受参数
$type = $_REQUEST["type"];
$id = $_REQUEST["id"];
//判断
if($type == "add"){
    $good_id = $_REQUEST["good_id"];
    /* 检查之前是否存在对应的数据，如果存在那么就修改num值，如果不存在那么就插入数据 */
    $sql = "SELECT * FROM cart WHERE good_id = $good_id AND id=$id"  ;
    $result = mysqli_query($db,$sql);
    if(mysqli_num_rows($result) == 0){
        $sql = "INSERT INTO `cart` (`cart_id`,`id`, `good_id`, `num`) VALUES (NULL, $id,$good_id, 1)";    
    }else{
        /* 更新数据 */
        $sql = "UPDATE `cart` SET `num`= `num`+ 1 WHERE `good_id`=$good_id AND id=$id";
      };
    $res = mysqli_query($db,$sql);
    // echo json_encode(array("status"=>"success"));
}elseif($type == "get"){
    $resData = array("status"=>"success","data"=>array());
     /* 查询数据库-cart表中所有的数据，并按照店铺来进行分类 */
     $sql = "SELECT cart.*,datas.title,datas.src,datas.selle ,datas.price FROM cart , datas WHERE cart.good_id = datas.id";
     $data = mysqli_fetch_all(mysqli_query($db, $sql), MYSQLI_ASSOC);
    // $data = $result->fetch_all(MYSQLI_ASSOC);
    // print_r($data);

     # 处理店铺信息(把购物车中所有的店铺名称都保存到数组中)
    $stores = array();
    for ($i = 0; $i < count($data); $i++) {
    /* 获取当前数据的店铺名称 */
     $currentShopName = $data[$i]["selle"];
     /* 检查数组中该店铺名称是否存在，如果不存在那么就添加到数组 */
     if(!in_array($currentShopName,$stores))
     {
        $stores[] = $currentShopName;
     }
  }
  # 处理JSON数据的外部结构
  $res_data = array("status"=>"success","data"=>array());
  for ($i = 0; $i < count($stores); $i++) {
    $res_data["data"][$i] = array("store" => $stores[$i], "goods" => array());
  }
  // # 把数据处理为指定的格式以便返回
  for ($i = 0; $i < count($data); $i++) {
    /* 获取当前数据的店铺名称 */
    $currentShopName = $data[$i]["selle"];
    for ($j = 0; $j < count($res_data["data"]); $j++) {
      if($res_data["data"][$j]["store"] == $currentShopName)
      {
        $res_data["data"][$j]["goods"][]= $data[$i];
      }
    }
  } 
  echo json_encode($res_data,true);
}elseif($type == "update")
{
  $sign = $_REQUEST["flag"];
  $good_id = $_REQUEST["good_id"];

  if($sign == "plus"){
    $plusSql = "UPDATE `cart` SET `num`= `num`+ 1 WHERE `good_id`=$good_id AND id=$id";
    mysqli_query($db,$plusSql);
  }elseif($sign == "reduce"){
    $reduceSql = "UPDATE `cart` SET `num`= `num`- 1 WHERE `good_id`=$good_id AND id=$id";
   
    mysqli_query($db,$reduceSql);
  }
  echo json_encode(array("status"=>"success"), true);
}elseif($type == "del")
{
  $good_id = $_REQUEST["good_id"];
  $delSql = "DELETE FROM `cart` WHERE good_id = $good_id AND id=$id";
  mysqli_query($db, $delSql);
  echo json_encode(array("status" => "success"), true);
}
?>