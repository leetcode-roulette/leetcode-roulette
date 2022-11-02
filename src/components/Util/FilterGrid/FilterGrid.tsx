import React, { FC, useCallback, useEffect, useState } from "react";
import throttle from "lodash.throttle";
import FilterToggle from "./FilterToggle";
import { Filter, filterToggleHandler } from "./Filter";

type FilterGridProps = {
	updateFilters: (filter: Filter) => void;
	tags: Array<Filter>;
}

const FilterGrid: FC<FilterGridProps> = ({ updateFilters, tags }: FilterGridProps) => {
	const getFiltersByBreakpoint = useCallback((brkPnt: string): number => {
		switch(brkPnt) {
			case "xs":
				return 9;
			case "sm":
				return 18;
			case "md":
				return 30;
			default:
				return tags.length;
		}
	}, [tags.length]);

	const getDeviceConfig = (width: number): string => {
		if(width < 720) {
			return 'xs'
		} else if(width >= 720 && width < 1024 ) {
			return 'sm'
		} else if(width >= 1024 && width < 1400) {
			return 'md'
		} else {
			return 'lg'
		}
	}
	const [brkPnt, setBrkPnt] = useState<string>(() =>  getDeviceConfig(window.innerWidth));
	const [defaultNumberOfFilters, setDefaultNumberOfFilters] = useState<number>(getFiltersByBreakpoint(brkPnt));
	const [showMore, setShowMore] = useState<Boolean>(false);
	const [numberOfFilters, setNumberOfFilters] = useState<number>(defaultNumberOfFilters);
	const FILTER_BUTTONS: JSX.Element[] = tags.map((filter: Filter) => (
		<FilterToggle
			styles="toggle toggle-white-outline"
			filter={filter}
			toggled={filter.toggled}
			onClick={() => filterToggleHandler(updateFilters, filter)}
		>
			{filter.text}
		</FilterToggle>
	));
	const onClick: () => void = () => setShowMore(!showMore);

	useEffect(() => {
		window.addEventListener('resize', throttle(function() {
		setBrkPnt(getDeviceConfig(window.innerWidth));
		}, 200))
	});

	useEffect(() => {
		setDefaultNumberOfFilters(getFiltersByBreakpoint(brkPnt));
	}, [brkPnt, getFiltersByBreakpoint]);

	useEffect(() => {
		setNumberOfFilters(showMore ? FILTER_BUTTONS.length : defaultNumberOfFilters);
	}, [showMore, FILTER_BUTTONS.length, defaultNumberOfFilters]);

	return (
		<div className="container-fluid pt-4">
			<div className="col">
				<div className="d-flex flex-wrap justify-content-center">
					{FILTER_BUTTONS.map(
						(filterToggle, index) =>
							index < numberOfFilters && (
								<div key={filterToggle.props.filter.id} className="mx-2 my-2">
									{filterToggle}
								</div>
							)
					)}
				</div>
				{ brkPnt === 'lg' || <button className="text-white btn mt-3" onClick={onClick}>
					Show {showMore ? "less" : "more"}
				</button> }
			</div>
		</div>
	)
}

export default FilterGrid;
