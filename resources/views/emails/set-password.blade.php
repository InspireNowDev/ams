<DOCTYPE html>
   <html lang="en-US">
     <head>
     <meta charset="utf-8">
     </head>
     <body>
     <h2>Hi {{$data['name']}}, we're glad you're here! Click here to set you password details: <br>
</h3>

<h3>Email: </h3><p>{{$data['email']}}</p>
<a href="{{$data['link']}}" target="_blank">Set password</a>


</body>
</html>