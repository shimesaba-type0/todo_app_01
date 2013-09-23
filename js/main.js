$(function(){
    var $list = $('.todoList');
    var $input = $('.todoInput');

    // 初期表示時にストレージからデータを復元する処理
    var storageList = localStorage['todo.list'];
    if(storageList) {
        JSON.parse(storageList).forEach(function(item){
            addTodo(item.text, item.complete);
        });
    }

    // Todoを追加する関数
    function addTodo(text, isComplete) {
        // リストアイテムを作成
        var $li = $('<li>');
        var $text = $('<span class="text">').text(text);
        var $checkbox = $('<input type="checkbox">');
        var $remove = $('<span class="remove">DEL</span>');
        $li.append($checkbox).append($text).append($remove);

        // 完了済みの場合の処理
        if(isComplete) {
            $li.addClass('complete');
            $checkbox.attr('checked', true);
        }

        // チェックボックスをクリックした時の処理
        $checkbox.click(function(){
            if($(this).is(':checked')){
                $li.addClass('complete');
            }else{
                $li.removeClass('complete');
            }

            // ストレージの更新
            updateStorage();
        });

        $remove.click(function(){
            if(window.confirm('削除して良いですか？')){
                $li.remove();
            }

            // ストレージの更新
            updateStorage();
        });

        // リストに追加
        $list.append($li);
    }

    function updateStorage() {
        var list = [];
        
        // 現在のリスト情報をすべて取得
        $list.find('li').each(function(){
            var $item = $(this);

            // テキストと完了の状態を保存する
            list.push({
                text: $item.find('.text').text(),
                complete: $item.hasClass('complete')
            });
        });

        // 文字列にしてストレージに保存
        localStorage['todo.list'] = JSON.stringify(list);
    }

    // フォームを送信した時の処理
    $('.todoForm').bind('submit', function(e){
        // フォームのデフォルトの動作を止める
        e.preventDefault();

        // テキストボックスに入っている文字列を取得
        var text = $input.val();

        // todoを追加
        addTodo(text);

        // テキストボックスを空にする
        $input.val('');
        
        // ストレージの更新
        updateStorage();
    });
});
