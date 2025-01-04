"use client";
import React, { useRef, useEffect } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

function randomID(len = 5) {
    const chars = "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP";
    let result = "";
    for (let i = 0; i < len; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

const Room = ({ roomID }) => {
    const containerRef = useRef(null);
    const roomJoined = useRef(false); // Prevent repeated joinRoom calls

    useEffect(() => {
        const setupMeeting = async () => {
            if (roomJoined.current) return; // Skip if already joined

            const appID = +process.env.NEXT_PUBLIC_APP_ID; // Convert to number
            const serverSecret = process.env.NEXT_PUBLIC_SERVER_SECRET;

            const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
                appID,
                serverSecret,
                roomID,
                randomID(),
                randomID()
            );

            const zp = ZegoUIKitPrebuilt.create(kitToken);

            zp.joinRoom({
                container: containerRef.current,
                sharedLinks: [
                    {
                        name: "Personal link",
                        url:
                            window.location.protocol +
                            "//" +
                            window.location.host +
                            window.location.pathname +
                            "?roomID=" +
                            roomID,
                    },
                ],
                scenario: {
                    mode: ZegoUIKitPrebuilt.GroupCall, // Use OneONoneCall for 1-on-1 calls
                },
            });

            roomJoined.current = true; // Mark room as joined
        };

        setupMeeting();
    }, [roomID]); // Re-run only if roomID changes

    return <div ref={containerRef} className="w-full h-screen">Room</div>;
};

export default Room;
