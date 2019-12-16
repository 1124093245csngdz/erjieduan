<?php
    // INSERT INTO `guomei`.`listdata` (`ID`, `src`, `price`, `title`, `discuss`, `selle`) VALUES ('2', 'qwe', '12', 'wqe', 'wqe', 'qwe');
    $db = mysqli_connect("127.0.0.1","root","","gome");
    //加载数据
    $jsonData = file_get_contents("listdata.json");
    //转成php数组
    $data = json_decode($jsonData,true);
   
    for($i = 0 ;$i<count($data);$i++){
        $src = $data[$i]["src"];
        $price = $data[$i]["price"];
        $title = $data[$i]["title"];
        $discuss = $data[$i]["discuss"];
        $selle = $data[$i]["selle"];

        $sql = "INSERT INTO `gome`.`data` (`src`, `price`, `title`, `discuss`, `selle`)
         VALUES ('$src', $price, '$title', '$discuss', '$selle')";
        mysqli_query($db, $sql);
    }
?>