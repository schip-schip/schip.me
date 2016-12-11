/* 設定ファイル */
$(this).ready(function() {
    $(this).execAuth({
            /* MD5：有効無効 */
             md5:true, // 有効
            //md5:false, // 無効
            /* パスワード */
            password: '6278695786b49a497585239cca47fe82', // MD5有効時（pass）
            // password: 'pass', // MD5無効時
            /* 右クリック防止：有効無効 */
            contextmenu_block:true,
            /* クッキーに利用するキー */
            cookie_key:'anchor_cookie_auth',
            /* エラーメッセージ出力場所のID */
            error_msg_id:'error',
            /* エラーメッセージ */
            error_msg_text:'パスワードが間違っています',
            /* ログイン後遷移先URL */
            action_url: '/anchor_download.html',
            /* リダイレクト先URL(ログインページ) */
            redirect_url: '/anchor.html'
        });
});
