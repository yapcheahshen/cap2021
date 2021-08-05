# Cap2021
Computer-Aided-Pariyatti, keywords: PWA, Svelte, Pitaka engine

## TODO
   use actions to implement toSim

   decorating basket text
   超連結 
    
    <b> <u> 可作為聚類標記
    <b class="pinyin">拼音</b>
    <u class="zhuyin">注音</u>

   breadcrumb navigation

   查字典 頭尾中

    <a name="1.1" @py="yi" @comp0="忄意">憶

    py={ yi:1 }
    comp0={忄:12  }
    comp1={ 意:13 }

    附在1.1 後。用最小的byte數存 py/yi 的seq
    輸入「意」，到comp0,comp1 array 過濾 13
    從一個字的seq也可找到 12,13 ，即構字式。

    不必存 部件到字的反向索引。部件數小於10000的話，comp0陣列為entry count * 2 
    過濾100~200kb的陣列也很快。而且可以這樣查 ?音  音?  (音為part0 or part1)

## 實現步驟



命名空間 書名 對照
點書名列出目錄

導航
    數字型 ( upperlevel，lower level, previous sibling, next sibling)
    一層數字及文字型只有 previous/next sibling

parse 連結。書名，卷名，標題

使用者貼文字？scan 連結
