export function getLists(offset) {
   return(
      fetch(`http://xoosha.com/ws/1/test.php?offset=${offset}`)
        .then(res => res.json())
        .catch()
        );
    
  }