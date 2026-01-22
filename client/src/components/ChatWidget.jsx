import { useEffect } from "react";
// import { sendChat } from "../api.js";

export function ChatWidget() {
  useEffect(() => {
    window.__ow = window.__ow || {};
    window.__ow.organizationId = "e3004745-d485-4733-ae79-dca59db5eb3d";
    window.__ow.template_id = "b107e864-5d70-4d74-9791-a46b900531b6";
    window.__ow.integration_name = "manual_settings";
    window.__ow.product_name = "chatbot";

    const script = document.createElement("script");
    script.async = true;
    script.type = "text/javascript";
    script.src = "https://cdn.openwidget.com/openwidget.js";
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
}

export default ChatWidget;

{
  /* <script>
  window.__ow = window.__ow || {};
  window.__ow.organizationId = "e3004745-d485-4733-ae79-dca59db5eb3d";
  window.__ow.template_id = "b107e864-5d70-4d74-9791-a46b900531b6";
  window.__ow.integration_name = "manual_settings";
  window.__ow.product_name = "chatbot";   
  ;(function(n,t,c){function i(n){return e._h?e._h.apply(null,n):e._q.push(n)}var e={_q:[],_h:null,_v:"2.0",on:function(){i(["on",c.call(arguments)])},once:function(){i(["once",c.call(arguments)])},off:function(){i(["off",c.call(arguments)])},get:function(){if(!e._h)throw new Error("[OpenWidget] You can't use getters before load.");return i(["get",c.call(arguments)])},call:function(){i(["call",c.call(arguments)])},init:function(){var n=t.createElement("script");n.async=!0,n.type="text/javascript",n.src="https://cdn.openwidget.com/openwidget.js",t.head.appendChild(n)}};!n.__ow.asyncInit&&e.init(),n.OpenWidget=n.OpenWidget||e}(window,document,[].slice))
</script>
<noscript>You need to <a href="https://www.chatbot.com/help/chat-widget/enable-javascript-in-your-browser/" rel="noopener nofollow">enable JavaScript</a> in order to use the AI chatbot tool powered by <a href="https://www.chatbot.com/" rel="noopener nofollow" target="_blank">ChatBot</a></noscript> */
}
