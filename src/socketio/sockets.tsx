import socket from "./index";
import React from "react";

export const userAuthenticated = (callback: () => void) => {
	socket.on("userAuthenticated", () => callback());
};

export const authSuccessfull = (callback: () => void) => {
	socket.on("userAuthenticated", () => callback());
};

export const authUserExists = (callback: () => void) => {
	socket.on("userAuthenticated", () => callback());
};

export const authIncorrectPassword = (callback: () => void) => {
	socket.on("userAuthenticated", () => callback());
};

export const error = (callback: () => void) => {
	socket.on("userAuthenticated", () => callback());
};
