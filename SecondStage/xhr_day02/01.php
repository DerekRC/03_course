<?php
  header('Conten-type:application/json');
  echo file_get_contents('./cities.json');


?>