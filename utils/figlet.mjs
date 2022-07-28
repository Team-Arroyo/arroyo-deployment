import figlet from 'figlet';

const arroyoHeader = () => {
  figlet('Arroyo', function(error, data) {
      if (error) {
          console.log('Something went wrong...');
          console.dir(error);
          return;
      }
      console.log(data)
  });
}

export default arroyoHeader;