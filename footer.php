  </div> <!-- closing #message -->
  <div id="modalSecurity" class="reveal-modal large row twelve columns">
	  <h2>About logging in with Google</h2>
	  <p>This approach (<a href="http://lifehacker.com/5918086/understanding-oauth-what-happens-when-you-log-into-a-site-with-google-twitter-or-facebook" title ="Understanding OAuth - Lifehacker article">called OAuth</a>) is one of the most secure ways to log in to a site. <strong>This site will not store your password.</strong> When you click the "Log in with Google" button, you log in to Google and then grant this site access to use your email address to identify you on this site.</p>
	  <p><strong>I don't share your email address with anyone or use it for anything</strong> other than finding your saved message on this site if you choose to save it.</p>
	  <a class="close-reveal-modal">&#215;</a>
  </div>
<!--	
  <div id="loginModal" class="reveal-modal large">
    <h2>Choose a login method</h2>
    <p>
		<form action="?login" method="post">
		    <button>Login with Google</button>
		</form>
    </p>
	<p>
      <?php include ('example.php'); ?>
    </p>
    <a class="close-reveal-modal">×</a>
  </div>
-->
  <!-- Included JS Files (Uncompressed) -->
  
  <!--
  
  <script src="javascripts/modernizr.foundation.js"></script>
  
  <script src="javascripts/jquery.js"></script>
  
  <script src="javascripts/jquery.foundation.mediaQueryToggle.js"></script>
  
  <script src="javascripts/jquery.foundation.navigation.js"></script>
  
  <script src="javascripts/jquery.foundation.buttons.js"></script>
  
  <script src="javascripts/jquery.foundation.tabs.js"></script>
  
  <script src="javascripts/jquery.foundation.forms.js"></script>
  
  <script src="javascripts/jquery.foundation.tooltips.js"></script>
  
  <script src="javascripts/jquery.foundation.accordion.js"></script>
  
  <script src="javascripts/jquery.placeholder.js"></script>
  
  <script src="javascripts/jquery.foundation.alerts.js"></script>
  
  -->
  
  <!-- Included JS Files (Compressed) -->
  <script src="javascripts/foundation.min.js"></script>
  <script src="javascripts/jquery.notific8.min.js"></script>
  <!-- Initialize JS Plugins -->
  <script src="javascripts/app.js"></script>

  <!-- reveal standalone plugin -->
  <script src="javascripts/jquery.reveal.js" type="text/javascript"></script>

  <!-- decoder scripts -->
  <script type="text/javascript">
	 Modernizr.load({
	        test: window.btoa && window.atob,
	        nope: 'javascripts/base64.min.js'
	    });
  </script>
  <script src="javascripts/words.js"></script>
  <script src="javascripts/pickletters.js"></script>
  <script>
	  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

	  ga('create', 'UA-45247844-1', 'mike-eng.com');
	  ga('send', 'pageview');
  </script>
</body>
</html>
