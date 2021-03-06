/* Javascript for AdvancedHTMLXBlock. */
var editor;
var editorContent = String.raw`<!DOCTYPE html>
<html>
    <head>
        <style>
        p {
            background-color: blue;
            color: white;
        }
        </style>
    </head>
    <body>
        <p>This is adv</p>
    </body>
</html>`;
function AdvancedHTMLXBlock(runtime, element) {
    var getContentHandlerUrl = runtime.handlerUrl(element, 'get_html_content');
    function updateIframeAfterSuccess(result) {
        var htmlcontent = result.htmlcontent;
        console.log(htmlcontent);
        var preview = document.getElementById("unique-id-iframe");
        preview.contentWindow.document.open();
        preview.contentWindow.document.write(htmlcontent);
        preview.contentWindow.document.close();
        preview.addEventListener("load", function(e) {
            preview.height = preview.contentWindow.document.body.scrollHeight;
            console.log(preview.height);
            addBlankTargetForAnchorTags(preview);
        });
    }
    function addBlankTargetForAnchorTags(adv_iframe) {
        var anchorTags = adv_iframe.contentDocument.getElementsByTagName("A");
        for(var i = 0; i < anchorTags.length; i++) {
            var aTag = anchorTags[i];
            aTag.target = '_blank';
        }
    }
    /*
    window.addEventListener('DOMContentLoaded', function dostuff(e) {
        var adv_iframe = document.getElementById("unique-id-iframe");
        adv_iframe.addEventListener("load", function(e) {
            adv_iframe.height = adv_iframe.contentWindow.document.body.scrollHeight;
            console.log(adv_iframe.height);
            addBlankTargetForAnchorTags(adv_iframe);
        });
    });
    */
    $(function ($) {
        /* Here's where you'd do things on page load. */
        $.ajax({
            type: "POST",
            url: getContentHandlerUrl,
            data: JSON.stringify({"need_data": "true"}),
            success: updateIframeAfterSuccess
        });
    });
}

function AdvancedHTMLXBlock_EditorInit(runtime, element) {
    function updateEditorAfterAJAX(result) {
        editorContent = result.htmlcontent;
        requirejs(["ace-editor/ace"], function() {
            editor.setValue(editorContent, -1);
            var preview = document.getElementById("AdVhTmLpReViEw");
            preview.contentWindow.document.open();
            preview.contentWindow.document.write(editorContent);
            preview.contentWindow.document.close();
        });
    }
    $("#saveEditor", element).click(function(eventObject) {
        var setContentHandlerUrl = runtime.handlerUrl(element, 'set_html_content');
        editorContent = editor.getValue();
        $.ajax({
            type: "POST",
            url: setContentHandlerUrl,
            data: JSON.stringify({"set_data": editorContent}),
            success: updateEditorAfterAJAX
        });
    })
    $(function ($) {
        /* On Page Load */
        var getContentHandlerUrl = runtime.handlerUrl(element, 'get_html_content');
        $.ajax({
            type: "POST",
            url: getContentHandlerUrl,
            data: JSON.stringify({"need_data": "true"}),
            success: updateEditorAfterAJAX
        });
        requirejs.config({
            paths: {
                'ace-editor': 'https://cdnjs.cloudflare.com/ajax/libs/ace/1.3.3/'
            }
        });
        requirejs(['ace-editor/ace'], function() {
            ace.config.set("packaged", true);
            ace.config.set("basePath", require.toUrl("ace-editor"));
            ace.config.set("modePath", require.toUrl("ace-editor"));
            editor = ace.edit("AdVeDiToR");
            editor.setValue(editorContent);
            editor.session.setUseWorker(true);
            editor.session.setMode("ace/mode/html");
            editor.session.on('change', function() {
                var tmpContent = editor.session.getValue();
                var preview = document.getElementById("AdVhTmLpReViEw");
                preview.contentWindow.document.open();
                preview.contentWindow.document.write(tmpContent);
                preview.contentWindow.document.close();
            })
        });
    });
}
