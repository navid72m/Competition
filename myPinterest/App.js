import { StatusBar } from 'expo-status-bar';
import React, { useState , useEffect} from 'react';
import { StyleSheet, Dimensions, View , Image, ActivityIndicator, Text, Button, FlatList} from 'react-native';
import ProgressiveImage from './components/progressiveImage';
import {getLists} from './services/getPage'
import { FlatGrid } from 'react-native-super-grid';

import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import {Linking} from 'react-native'
// import {  } from "react-native-bidirectional-infinite-scroll";
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards'


// export default function App() {
//   const [imgURLs, setImgURL]= useState([])
//   var url
//   const getData = (offset) =>{getLists(offset).then((data) => {
  
//     if(data){
//       console.log(data.length)
//       for(let j =0 ; j < 5 ; j++){
//       // console.log(data[0]['image_url']);
//       // useEffect(() =>{setImgURL(data[0]['image_url'])},[] )
//       // console.log(imgURL);
//       setImgURL(oldimgUrls => [...oldimgUrls,data[j]['image_url']])
     
//       }
  
//     }
//   });

  
//   };
//   getData(20);
//   return (
//     <View>
//       {imgURLs.map( imgURL =>  <Image style={styles.image}  source={{uri: `${imgURL}`}}  />  )}
     
     
      
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   image:{
//     width : 383,
//     height :684,
//   },
// });
const w = Dimensions.get('window');

const styles = StyleSheet.create({
  image:{
    float : 'left',
    width : w.width/5,
    height : w.height/3,
    margin:"20px",
   
  },
  gridView: {
    marginTop: 10,
    flex: 1,
    flexDirection: 'column',
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 150,

  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
  loading: {
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'center'
},
});

function  Home (props) {
 
  // console.log(props.item.item.image_url)
    return (
  
      <Card >
      <Image 
        source={{uri: props.item.item.image_url}} 
        title={props.item.item.name}
        style={styles.image}
      />
       <CardTitle 
        title={props.item.item.name}
        subtitle={props.item.item.price}
       />
    
      
      <CardAction 
        separator={true} 
        inColumn={false}>
      
        <CardButton
          onPress={() => {Linking.openURL(props.item.item.url)}}
          title="More"
          color="blue"
        />
      </CardAction>
    </Card>
 
    );
  
}

export default function App(){
  const [mock,setMock] = useState([1])
  const [page,setPage] = useState(0)
  const [imgURLs, setImgURL]= useState([])
  const [itemNum,setItemNum] = useState(0)
  let mounted = true;

  const renderHeader = () => (
    <Text style={styles.title}>RN News</Text>
  )
  const renderFooter = () => (
    <View style={styles.footerText}>
        
    </View>
  )

  const renderEmpty = () => (
      <View style={styles.emptyText}>
          <Text>No Data at the moment</Text>
          <Button onPress={() => fetchMoreData()} title='Refresh'/>
      </View>
  )

  const fetchMoreData = () => {
    // if (!newsModel.isListEnd && !newsModel.moreLoading) {
       
          setPage(page + 1)
          
       
    // }
  }
  useEffect(() => {
    
    getLists(page)
      .then(items => {
       
          for(let i =0 ; i <items.length; i ++){
            // console.log(items[i])
            setImgURL(oldimgUrls => [...oldimgUrls,items[i]])
          }
        
      })
    return () => mounted = false;
  },[page])

  //   const getData = (offset) =>{getLists(offset).then((data) => {
  
  //   if(data){
  //     console.log(data.length)
  //     for(let j =0 ; j < data.length; j++){
  //     // console.log(data[0]['image_url']);
  //     // useEffect(() =>{setImgURL(data[0]['image_url'])},[] )
  //     // console.log(imgURL);
  //     setImgURL(oldimgUrls => [...oldimgUrls,data[j]])
     
  //     }
  
  //   }
  // });

  
  // }
  // getData(page)
  // console.log(imgURLs)
  // console.log(itemNum)
  return(

    
    

  <FlatList
  contentContainerStyle={{flexGrow: 1}}
      data={imgURLs}
      renderItem={(item) =>(
       
         
          <Home item = {item}/>
    
     
      )}
      // keyExtractor={(item) => item.id}
      ListHeaderComponent={renderHeader}
      ListEmptyComponent={renderEmpty}
      onEndReachedThreshold={0.2}
      onRefresh={()=> {setPage(0); }}
      refreshing={true}
      
      onEndReached={fetchMoreData}
      numColumns={3}
      keyExtractor={(item, index) => index}
  />
    

    
  )
}