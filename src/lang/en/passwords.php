<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Password Reset Language Lines
    |--------------------------------------------------------------------------
    |
    | The following language lines are the default lines which match reasons
    | that are given by the password broker for a password update attempt
    | has failed, such as for an invalid token or invalid new password.
    |
    */

    'reset' => '',  // 設計図を見る限り'reset'は不要だが、どんな影響が出るかわからないので、削除はせずに空の文字列を返すようにする
    'sent' => 'パスワードの再設定用URLを電子メールで送信しました！',
    'throttled' => 'Please wait before retrying.',
    'token' => 'パスワードリセットできません。再度、最初最初からやり直してください。',
    'user' => "このメールアドレスは登録されていません。",

];
