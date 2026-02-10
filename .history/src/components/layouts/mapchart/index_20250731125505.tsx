import { useEffect, useRef, useState } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import * as am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5geodata_continentsLow from "@amcharts/amcharts5-geodata/continentsLow";
import { generateCooperationMap } from "@/constants/worldMap";
import { getCountries } from "@/service/partner/getCountries";

interface Country {
  mou: number;
  moa: number;
  ia: number;
}
// Data mentah (bisa diganti dari API atau props)

const MapChart = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [countries, setCountries] = useState<Record<string, Country>>({});

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const data = await getCountries();
        setCountries(data); // pastikan API return array partner
      } catch (error) {
        console.error("Failed to fetch partners", error);
      }
    };

    fetchPartners();
  }, []);

  useEffect(() => {
    if (!chartRef.current) return;

    const root = am5.Root.new(chartRef.current);
    root.setThemes([am5themes_Animated.default.new(root)]);

    const mapChart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: "none",
        panY: "none",
        wheelX: "none",
        wheelY: "none",
        projection: am5map.geoNaturalEarth1(),
      })
    );

    mapChart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_continentsLow as never,
        exclude: ["antarctica"],
        fill: am5.color(0xbbbbbb),
      })
    );

    const pointSeries = mapChart.series.push(
      am5map.MapPointSeries.new(root, {})
    );
    const colorSet = am5.ColorSet.new(root, { step: 2 });

    pointSeries.bullets.push((root, series, dataItem) => {
      const { title, value } = dataItem.dataContext as {
        title: string;
        value: number;
      };

      const container = am5.Container.new(root, {});
      const color = colorSet.next();
      const chartWidth = root.dom.clientWidth;

      let radius = 10 + (value / 20) * 10;
      if (chartWidth < 600) radius *= 0.8;
      else if (chartWidth < 1000) radius *= 1;

      let fontSize = 8;
      if (chartWidth > 1000) fontSize = 16;
      else if (chartWidth > 600) fontSize = 14;

      container.children.push(
        am5.Circle.new(root, {
          radius,
          fill: color,
          dy: -radius * 3,
        })
      );

      container.children.push(
        am5.Line.new(root, {
          stroke: color,
          height: -40,
          strokeGradient: am5.LinearGradient.new(root, {
            stops: [{ opacity: 1 }, { opacity: 1 }, { opacity: 0 }],
          }),
        })
      );

      container.children.push(
        am5.Label.new(root, {
          text: `${value}`,
          fill: am5.color(0xffffff),
          fontWeight: "400",
          fontSize,
          centerX: am5.p50,
          centerY: am5.p50,
          dy: -radius * 3,
        })
      );

      container.children.push(
        am5.Label.new(root, {
          text: title,
          fill: color,
          fontWeight: "500",
          fontSize,
          centerY: am5.p50,
          dy: -radius * 3,
          dx: radius,
        })
      );

      return am5.Bullet.new(root, {
        sprite: container,
      });
    });

    // Panggil generateCooperationMap
    const cooperationData = generateCooperationMap(countries);

    pointSeries.data.setAll(
      cooperationData.map((d) => ({
        geometry: { type: "Point", coordinates: [d.longitude, d.latitude] },
        title: d.title,
        value: d.value,
      }))
    );

    return () => {
      root.dispose();
    };
  });

  return (
    <div
      id="chartdiv"
      ref={chartRef}
      className="h-[400px] w-full md:h-[500px] lg:h-[600px]"
    />
  );
};

export default MapChart;
