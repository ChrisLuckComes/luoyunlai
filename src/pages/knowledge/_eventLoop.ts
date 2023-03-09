export const RESULT = `\`\`\`html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      function example() {
        setTimeout(() => {
          console.log(1);
        }, 0);
      }

      function secondExample() {
        Promise.resolve().then(() => {
          console.log(2);
        });
      }
      console.log(0);
      example();
      secondExample();
      console.log(4);
    </script>
  </head>
  <body></body>
</html>

\`\`\``;
