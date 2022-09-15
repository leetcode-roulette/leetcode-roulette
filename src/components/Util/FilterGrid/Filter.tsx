import React from "react";

export interface Filter {
	id: number;
	text: string;
	toggled?: boolean;
}

export const DEFAULT_FILTERS: Filter[] = [
	{
		id: 0,
		text: "Array",
		toggled: false,
	},
	{
		id: 1,
		text: "String",
		toggled: false,
	},
	{
		id: 2,
		text: "Hash Table",
		toggled: false,
	},
	{
		id: 3,
		text: "Dynamic Programming",
		toggled: false,
	},
	{
		id: 4,
		text: "Sorting",
		toggled: false,
	},
	{
		id: 5,
		text: "Math",
		toggled: false,
	},
	{
		id: 6,
		text: "Greedy",
		toggled: false,
	},
	{
		id: 7,
		text: "Binary Search",
		toggled: false,
	},
	{
		id: 8,
		text: "Heaps",
		toggled: false,
	},
];