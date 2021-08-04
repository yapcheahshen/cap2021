# 介面設計


## 主畫面
   主閱讀：Stackview。
   輔助頁籤：
       資料庫選取及目錄 (更新主閱讀 breadcrumb)
       搜尋條件及結果   (點結果加入到主閱讀後面，搜尋條件不變CardView重覆使用)
       查字典          (點字典出處引入，加到主閱讀)
       反連結, 對應注疏 (StackView)
       書籤/螢光筆/筆記  (只要做其中一項操作，即可列出，更新主閱讀 breadcrumb）
       設定            (無損簡化字)
## StackView
    顯示若干個CardView
    第一個CardView 有 breadcrumb，

## CardView = CardMenu + Array of LineView
    顯示 TextLocator 所指文段
    從那裡連過來 (TextLocator 或搜尋條件)
    可動態在行或行之間插入其他 LineView ( 生字，注解，校勘等) ，
    但不改變卡片的 TextLocator

## CardMenu 
操作：關閉、加到書籤、讀上下段、反連結（清單另外顯示）。
     升級為閱讀頭

## LineView = array of SpanView
  顯示一個TextLocator所指向的行。
  

## SpanView
## ReferLineView
  在CardView 中臨時顯示的生字或校注。
  只能關閉，不能加入書籤
  只能有一個instance。

## 查生字
  點任何字，列出最長可能的生字，顯示在行下方以 ReferLineView 顯示。