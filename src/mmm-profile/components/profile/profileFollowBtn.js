import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import { FiHeart, FiBookmark } from "react-icons/fi";
import { fetchFollowings } from "../rest-api/fetchData";
import saveUserData from "../rest-api/saveUserData";
import { FaSpinner } from "react-icons/fa";

export default function ProfileFollowBtn(props) {
  const { userId, profileOf } = props;
  const [isFollowing, setIsFollowing] = useState(false);
  const [followings, setFollowings] = useState([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const init = async () => {
      const response = await fetchFollowings(userId);
      if (!response.ok) {
        return;
      }
      const data = await response.json();
      setFollowings(data.following);

      const isUserFollowing = data.following
        ? data.following.includes(parseInt(profileOf))
        : false;
      setIsFollowing(isUserFollowing);
    };
    init();
  }, [props]);

  const handleClick = async (e) => {
    setSaving(true);
    const memberId = parseInt(profileOf);
    const newFollowingData = isFollowing
      ? followings
        ? [...followings].filter((x) => x != memberId)
        : []
      : followings
      ? [...followings, memberId]
      : [memberId];
    const data = {
      fields: {
        following: newFollowingData,
      },
    };
    console.log(data);
    saveUserData("wp/v2/users/" + userId, data)
      .then((response) => {
        if (response.ok === true) {
          // Submitted successfully!
          isFollowing ? setIsFollowing(false) : setIsFollowing(true);
          setSaving(false);
        }
        return response.json();
      })
      .then((object) => {
        // Comment submission failed.
        // Output `object.message` to see the error message.
        // enqueueSnackbar(object.message, { variant: 'error' });
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <>
      {/*<IconButton color="primary" aria-label="follow" component="span">
        <FiHeart style={{ fontSize: 40, strokeWidth:"1"}} />
      </IconButton>
      follow this member*/}
      <Button
        variant="contained"
        color={isFollowing ? "secondary" : "primary"}
        onClick={handleClick}
        disabled={saving}
      >
        {saving && (
          <FaSpinner
            icon="spinner"
            className="spinner"
            style={{ marginRight: 10 }}
          />
        )}
        {isFollowing ? "Unfollow" : "Follow this member"}
      </Button>
    </>
  );
}
