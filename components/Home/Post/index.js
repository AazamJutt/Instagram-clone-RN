import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Divider } from "react-native-elements/dist/divider/Divider";

const postFooterIcons = [
  {
    name: "Like",
    imageUrl: require("../../../assets/like.png"),
    likedImage: require("../../../assets/liked.png"),
  },
  {
    name: "Comment",
    imageUrl: require("../../../assets/comment.png"),
  },
  {
    name: "Share",
    imageUrl: require("../../../assets/dm.png"),
  },
  {
    name: "Save",
    imageUrl: require("../../../assets/save.png"),
  },
];

const PostHeader = ({ post }) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      margin: 5,
      alignItems: "center",
    }}
  >
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Image source={{ uri: post.profile_picture }} style={styles.story} />
      <Text style={{ color: "white", marginLeft: 10, fontWeight: "300" }}>
        {post.user}
      </Text>
    </View>
    <View>
      <Image
        source={require("../../../assets/menu.jpg")}
        style={styles.footerIcon}
      />
    </View>
  </View>
);

const PostImage = ({ post }) => (
  <View style={{ width: "100%", height: 450 }}>
    <Image
      style={{ height: "100%", resizeMode: "cover" }}
      source={{ uri: post.imageUrl }}
    />
  </View>
);

const Icon = ({ imageStyle, imgUrl }) => (
  <TouchableOpacity>
    <Image style={imageStyle} source={imgUrl} />
  </TouchableOpacity>
);

const PostFooter = ({ post }) => (
  <View style={{ flexDirection: "row", marginBottom: 5 }}>
    <View
      style={{
        flexDirection: "row",
        width: "32%",
        justifyContent: "space-between",
      }}
    >
      <Icon
        imageStyle={styles.footerIcon}
        imgUrl={
          post.liked
            ? postFooterIcons[0].likedImage
            : postFooterIcons[0].imageUrl
        }
      />
      <Icon
        imageStyle={styles.footerIcon}
        imgUrl={postFooterIcons[1].imageUrl}
      />
      <Icon
        imageStyle={styles.footerIcon}
        imgUrl={postFooterIcons[2].imageUrl}
      />
    </View>
    <View
      style={{
        flex: 1,
        alignItems: "flex-end",
      }}
    >
      <Icon
        imageStyle={styles.footerIcon}
        imgUrl={postFooterIcons[3].imageUrl}
      />
    </View>
  </View>
);

const Caption = ({ post }) => (
  <View>
    <Text style={{ color: "white", fontWeight: "600" }}>
      {post ? post.likes : 0} likes
    </Text>
    <Text style={{ color: "white" }}>
      <Text style={{ fontWeight: "600" }}>{post.user}</Text>{" "}
      <Text>{post ? post.caption : ""}</Text>
    </Text>
  </View>
);

const CommentSection = ({ post }) => (
  <TouchableOpacity>
    {post.comments && (
      <TouchableOpacity>
        <Text style={{ color: "gray", fontWeight: "500" }}>
          View all{" "}
          {post.comments.length +
            " " +
            (post.comments.length > 1 ? "comments" : "comment")}
        </Text>
      </TouchableOpacity>
    )}
  </TouchableOpacity>
);

const Comment = ({ comment }) => (
  <Text style={{ color: "white" }}>
    <Text style={{ fontWeight: "600" }}>{comment && comment.user}</Text>{" "}
    <Text>{comment && comment.comment}</Text>
  </Text>
);

export default function Post({ post }) {
  return (
    <View style={{ marginBottom: 20 }}>
      <Divider width={2} orientation="vertical" />
      <PostHeader post={post} />
      <PostImage post={post} />
      <View style={{ marginHorizontal: 15, margin: 10 }}>
        <PostFooter post={post} />
        <Caption post={post} />
        <CommentSection post={post} />
        <Comment comment={post.comments ? post.comments[0] : null} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  story: {
    width: 35,
    height: 35,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#ff8501",
  },
  footerIcon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
});
