## 交作業流程
1. `git branch week1` 建立新的 branch 。（注意要在 master 下 branch）
2. `git checkout week1` 轉換到 week1 的 branch 下。
3. `git branch -v` 確認是否順利轉換 branch（亮綠色的是當下的 branch）。
4. `cd` 到 homework 的目錄下。
5. `vim hw1.md（作業檔案）` 文字編輯作業檔案，開始寫作業。
6. 寫完作業輸入「:q」。
7. `git status` 查看版本控制狀態。
8. `git commit -am "add week1"`在 unstaged 的檔案，把它們給加到版本控制中並 commit 一個版本。（還未使用過 git add 的檔案不在此限。 ）
9. `git push origin week1` 把更改後的 branch ，push 上去 github。
10. 在 github 的 repository 上，會看到頁面中間新增一行字：「Your recently pushed branches」，按下右手邊的綠色按鈕：「Compare & pull request」。
11. 確認 base 的地方是 master，compare 的地方是 week1（欲 merge 的 branch）。
12. 輸入標題：「week1 作業」與敘述後，按「create pull request」，複製網址。
13. 到另外一個專門繳交第三期作業的 repository，點入 issue，建立「New Issue」。
14. 標題一定要照格式打：「[Week1]」，否則會被機器人殺掉！
15. 敘述的部份貼上網址和要說的話，都打完之後，按「Submit new issue」。
16. 等待 Huli 的 merge，merge 完會 close 建立的issue。若需要修改的地方，再新增一個 branch ，重複上述的步驟。
17. 本地電腦的部份，`git checkout master`。
18. `git pull origin master`，把 repository 上面已經 merge 完的 master 給 pull 下來。
19. `git branch -d week1` 把一開始建立的 branch 給刪除。
20. `git branch -v` 確認現有的 branch 的狀態。

### 大功告成！
