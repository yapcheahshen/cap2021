# Cap2021
Computer-Aided-Pariyatti, keywords: PWA, Svelte, Pitaka engine

## TODO
   card pull down menu on left ,hamburger 
   card 的標題
   
   autofolding nested text (學生字典) with \t or "-" indent
   moedict 的引文摺疊 collapseview
   只摺疊一層。如太長的段。

   上下段 (字典不用，只適合可連續閱讀的)

   查不同的字典，(moezd, xszd , kxzd , 部件及unihan查詢)
   
   模式決定點本文的動作
   閱讀模式顯示超連結
   搜尋模式，點一下查關鍵字
   詞典模式不顯示超連結，點字查字典
     只要匯出一個長名單即為詞典，如開放文學。
     設《.》掃，點一下顯示書的摘要。
     
   參考模式：找書名 列出所有引文(並做超連結)，並列出反向的連結，
   筆記模式，點一下加注筆記


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
