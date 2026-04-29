import { useEffect, useMemo, useRef, useState } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import * as am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import { generateCooperationMapByCountry } from "@/constants/worldMap";
import { getAgreements } from "@/service/partner/getCountries";
import { Minus, Plus} from "lucide-react";

interface Country {
  mou: number;
  moa: number;
  ia: number;
}

interface TooltipState {
  visible: boolean;
  x: number;
  y: number;
  align: "left" | "right";
  title: string;
  color: string;
  value: number;
  mou: number;
  moa: number;
  ia: number;
}

interface MapDatum {
  title: string;
  latitude: number;
  longitude: number;
  value: number;
  mou: number;
  moa: number;
  ia: number;
}

interface PreparedPoint extends MapDatum {
  originalLatitude: number;
  originalLongitude: number;
  radius: number;
  fill: number;
  fillLight: number;
  shortValue: string;
  showInnerLabel: boolean;
  showCountryLabel: boolean;
  animationIndex: number;
}

const BREAKPOINTS = {
  sm: 640,
  lg: 1024,
};

const BASE_MIN_RADIUS = 8;
const BASE_SCALE_FACTOR = 6;

const MapChart = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [countries, setCountries] = useState<Record<string, Country>>({});
  const [chartWidth, setChartWidth] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [tooltip, setTooltip] = useState<TooltipState>({
    visible: false,
    x: 0,
    y: 0,
    align: "right",
    title: "",
    color: "#60a5fa",
    value: 0,
    mou: 0,
    moa: 0,
    ia: 0,
  });

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const data = await getAgreements();
        setCountries(data);
      } catch (error) {
        console.error("Failed to fetch partners", error);
      }
    };

    fetchPartners();
  }, []);

  useEffect(() => {
    if (!wrapperRef.current) return;

    const updateSize = () => {
      setChartWidth(wrapperRef.current?.clientWidth || 0);
    };

    updateSize();

    const observer = new ResizeObserver(() => {
      updateSize();
    });

    observer.observe(wrapperRef.current);

    return () => observer.disconnect();
  }, []);

  const preparedData = useMemo(() => {
    const rawData = generateCooperationMapByCountry(countries);
    return prepareMapData(rawData, chartWidth);
  }, [countries, chartWidth]);

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

    mapChart.set("opacity", 0);
    mapChart.animate({
      key: "opacity",
      from: 0,
      to: 1,
      duration: 800,
      easing: am5.ease.out(am5.ease.cubic),
    });

    const polygonSeries = mapChart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow as never,
        exclude: ["antarctica"],
      })
    );
    polygonSeries.mapPolygons.template.setAll({
      fill: am5.color(0xdde8f5),
      stroke: am5.color(0xb8cce4),
      strokeWidth: 1,
      fillGradient: am5.LinearGradient.new(root, {
        rotation: 90,
        stops: [
          { color: am5.color(0xf8fbff), offset: 0 },
          { color: am5.color(0xdde8f5), offset: 1 },
        ],
      }),
    });

    const pointSeries = mapChart.series.push(
      am5map.MapPointSeries.new(root, {})
    );

    pointSeries.data.setAll(
      preparedData.map((d) => ({
        geometry: { type: "Point", coordinates: [d.longitude, d.latitude] },
        originalGeometry: { type: "Point", coordinates: [d.originalLongitude, d.originalLatitude] },
        title: d.title,
        value: d.value,
        mou: d.mou,
        moa: d.moa,
        ia: d.ia,
        radius: d.radius,
        fill: d.fill,
        fillLight: d.fillLight,
        shortValue: d.shortValue,
        showInnerLabel: d.showInnerLabel,
        showCountryLabel: d.showCountryLabel,
        animationIndex: d.animationIndex,
      }))
    );

    pointSeries.bullets.push((bulletRoot, _series, dataItem) => {
      const point = dataItem.dataContext as PreparedPoint;
      const bubbleColor = am5.color(point.fill);
      const bubbleLight = am5.color(point.fillLight);
      const hoverColor = am5.Color.brighten(bubbleColor, 0.18);

      const container = am5.Container.new(bulletRoot, {
        cursorOverStyle: "pointer",
        interactive: true,
        opacity: 0,
        scale: 0,
      });

      const pulseRing = container.children.push(
        am5.Circle.new(bulletRoot, {
          radius: point.radius,
          fillOpacity: 0,
          stroke: bubbleLight,
          strokeOpacity: 0,
          strokeWidth: 2,
        })
      );

      const circle = container.children.push(
        am5.Circle.new(bulletRoot, {
          radius: point.radius,
          fill: bubbleColor,
          fillOpacity: 0.78,
          stroke: am5.color(0xffffff),
          strokeWidth: 1.5,
          shadowColor: am5.color(0x000000),
          shadowOpacity: 0.2,
          shadowBlur: 8,
          shadowOffsetY: 3,
          fillGradient: am5.LinearGradient.new(bulletRoot, {
            rotation: 90,
            stops: [
              { color: bubbleLight, offset: 0 },
              { color: bubbleColor, offset: 1 },
            ],
          }),
        })
      );

      if (point.showInnerLabel) {
        container.children.push(
          am5.Label.new(bulletRoot, {
            text: point.shortValue,
            fill: am5.color(0xffffff),
            fontWeight: "700",
            fontSize: chartWidth >= BREAKPOINTS.lg ? 12 : 10,
            centerX: am5.p50,
            centerY: am5.p50,
            populateText: false,
          })
        );
      }

      if (point.showCountryLabel) {
        container.children.push(
          am5.Label.new(bulletRoot, {
            text: point.title,
            fill: am5.color(0x334155),
            opacity: 0.8,
            fontSize: 9,
            centerX: am5.p50,
            y: point.radius + 8,
            populateText: false,
          })
        );
      }

      const showTooltip = (event: any) => {
        updateTooltipFromEvent(event, point, point.fill, wrapperRef, setTooltip);
      };

      const hideTooltip = () => {
        setTooltip((current) => ({ ...current, visible: false }));
      };

      container.events.on("pointerover", (event) => {
        circle.animate({
          key: "scale",
          from: circle.get("scale") || 1,
          to: 1.2,
          duration: 200,
          easing: am5.ease.out(am5.ease.cubic),
        });
        circle.set("fillOpacity", 1);
        circle.set("fill", hoverColor);
        animatePulseRing(pulseRing, point.radius);
        showTooltip(event);
      });

      container.events.on("pointerout", () => {
        circle.animate({
          key: "scale",
          from: circle.get("scale") || 1.2,
          to: 1,
          duration: 200,
          easing: am5.ease.out(am5.ease.cubic),
        });
        circle.set("fillOpacity", 0.78);
        circle.set("fill", bubbleColor);
        pulseRing.setAll({ strokeOpacity: 0, scale: 1 });
        hideTooltip();
      });

      window.setTimeout(() => {
        container.animate({
          key: "scale",
          from: 0,
          to: 1,
          duration: 900,
          easing: am5.ease.elastic,
        });
        container.animate({
          key: "opacity",
          from: 0,
          to: 1,
          duration: 500,
          easing: am5.ease.out(am5.ease.cubic),
        });
      }, point.animationIndex * 80);

      if (isTopBubble(point, preparedData)) {
        startBreathing(container);
      }

      return am5.Bullet.new(bulletRoot, {
        sprite: container,
      });
    });

    return () => {
      root.dispose();
    };
  }, [chartWidth, preparedData]);

  const isMobile = chartWidth > 0 && chartWidth < BREAKPOINTS.sm;

  return (
    <div
      ref={wrapperRef}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#f8faff] to-[#eef3fb]"
    >
      <div
        id="chartdiv"
        ref={chartRef}
        className="h-[400px] w-full transition-transform duration-300 md:h-[500px] lg:h-[600px]"
        style={{
          transform: `scale(${zoom})`,
          transformOrigin: "center center",
        }}
      />

      {isMobile ? (
        <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/90 p-1 shadow-lg backdrop-blur">
          <button
            type="button"
            onClick={() => setZoom((current) => Math.max(1, Number((current - 0.15).toFixed(2))))}
            className="flex h-9 w-9 items-center justify-center rounded-full text-lg font-semibold text-slate-700 transition hover:bg-slate-100 cursor-pointer"
            aria-label="Zoom out map"
          >
            <Minus/>
          </button>
          <button
            type="button"
            onClick={() => setZoom((current) => Math.min(1.6, Number((current + 0.15).toFixed(2))))}
            className="flex h-9 w-9 items-center justify-center rounded-full text-lg font-semibold text-slate-700 transition hover:bg-slate-100 cursor-pointer"
            aria-label="Zoom in map"
          >
            <Plus/>
          </button>
        </div>
      ) : null}

      <div
        className={`pointer-events-none absolute z-30 w-[240px] max-w-[calc(100%-1.5rem)] transition-all duration-150 ${
          tooltip.visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        }`}
        style={{
          left: tooltip.align === "right" ? tooltip.x : undefined,
          right: tooltip.align === "left" ? tooltip.x : undefined,
          top: tooltip.y,
        }}
      >
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white/95 text-slate-900 shadow-[0_12px_40px_rgba(0,0,0,0.12)] backdrop-blur-md">
          <div className="flex items-center gap-2 border-b border-slate-100 px-4 py-3 bg-slate-50/50">
            <span className="inline-flex h-2.5 w-2.5 rounded-full" style={{ backgroundColor: tooltip.color }} />
            <span className="text-sm font-bold tracking-tight text-slate-800">{tooltip.title}</span>
          </div>
          
          <div className="grid grid-cols-3">
            <StatCell label="MoU" value={tooltip.mou} />
            <StatCell label="MoA" value={tooltip.moa} />
            <StatCell label="IA" value={tooltip.ia} />
          </div>
          
          <div className="border-t border-white/10 px-4 py-3 text-center text-sm font-semibold">
            Total: {formatBubbleValue(tooltip.value)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapChart;

function StatCell({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-white px-3 py-3 text-center">
      <p className="text-[10px] uppercase tracking-[0.12em] font-bold text-slate-400">
        {label}
      </p>
      <p className="mt-0.5 text-base font-extrabold text-slate-800">
        {value}
      </p>
    </div>
  );
}

function getBubbleRadius(value: number, maxRadius: number) {
  const radius = BASE_MIN_RADIUS + Math.log(value + 1) * BASE_SCALE_FACTOR;
  return Math.max(BASE_MIN_RADIUS, Math.min(radius, maxRadius));
}

function applyBubbleJitter(points: PreparedPoint[]) {
  const adjusted = points.map((point) => ({ ...point }));

  for (let iteration = 0; iteration < 5; iteration += 1) {
    for (let i = 0; i < adjusted.length; i += 1) {
      for (let j = i + 1; j < adjusted.length; j += 1) {
        const first = adjusted[i];
        const second = adjusted[j];
        const dx = (first.longitude - second.longitude) * Math.cos(((first.latitude + second.latitude) / 2) * (Math.PI / 180));
        const dy = first.latitude - second.latitude;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const minDistance = ((first.radius + second.radius) / 2) * 0.52;

        if (distance > 0 && distance < minDistance) {
          const angle = Math.atan2(dy, dx);
          const push = (minDistance - distance) * 0.5;
          const offsetLng = Math.cos(angle) * push;
          const offsetLat = Math.sin(angle) * push;

          first.longitude += offsetLng;
          first.latitude += offsetLat;
          second.longitude -= offsetLng;
          second.latitude -= offsetLat;
        } else if (distance === 0) {
          second.longitude += 1.2 + j * 0.08;
          second.latitude += 0.8 + i * 0.06;
        }
      }
    }
  }

  return adjusted;
}

function getBubbleColors(value: number, allPoints: MapDatum[]) {
  const color1 = { r: 103, g: 113, b: 220 };
  const color2 = { r: 103, g: 183, b: 220 };
  const color3 = { r: 163, g: 103, b: 220 };

  let finalColor;

  if (value > 100) {
    finalColor = color3;
  } else if (value > 1) {
    finalColor = color2;
  } else {
    finalColor = color1;
  }

  const light = {
    r: Math.min(255, finalColor.r + 30),
    g: Math.min(255, finalColor.g + 30),
    b: Math.min(255, finalColor.b + 30),
  };

  return [
    toColorNumber(light.r, light.g, light.b), 
    toColorNumber(finalColor.r, finalColor.g, finalColor.b)
  ] as const;
}

function prepareMapData(rawData: MapDatum[], width: number): PreparedPoint[] {
  const maxRadius = width >= BREAKPOINTS.lg ? 35 : width >= BREAKPOINTS.sm ? 25 : 18;

  const points = rawData
    .map((point) => {
      const radius = getBubbleRadius(point.value, maxRadius);
      const [fillLight, fill] = getBubbleColors(point.value, rawData);

      return {
        ...point,
        originalLatitude: point.latitude,
        originalLongitude: point.longitude,
        radius,
        fill,
        fillLight,
        shortValue: formatBubbleValue(point.value),
        showInnerLabel: width >= BREAKPOINTS.sm && radius >= 12 && point.value > 1,
        showCountryLabel: width >= BREAKPOINTS.sm && point.value >= 10,
        animationIndex: 0,
      };
    })
    .sort((a, b) => b.value - a.value);

  return applyBubbleJitter(points).map((point, index) => ({
    ...point,
    animationIndex: index,
  }));
}

function toColorNumber(r: number, g: number, b: number) {
  return (r << 16) + (g << 8) + b;
}

function formatBubbleValue(value: number) {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(value >= 10000 ? 0 : 1).replace(".0", "")}K`;
  }

  return `${value}`;
}

function updateTooltipFromEvent(
  event: any,
  point: PreparedPoint,
  fill: number,
  wrapperRef: React.RefObject<HTMLDivElement | null>,
  setTooltip: React.Dispatch<React.SetStateAction<TooltipState>>,
) {
  const wrapper = wrapperRef.current;
  if (!wrapper || !event) return;
  const rect = wrapper.getBoundingClientRect();
  const clientX = event.point ? event.point.x : (event.originalEvent?.clientX ?? 0);
  const clientY = event.point ? event.point.y : (event.originalEvent?.clientY ?? 0);
  const domX = event.originalEvent ? event.originalEvent.clientX - rect.left : 0;
  const domY = event.originalEvent ? event.originalEvent.clientY - rect.top : 0;
  const prefersLeft = domX > rect.width - 280;

  setTooltip({
    visible: true,
    x: prefersLeft ? 16 : Math.min(domX + 18, rect.width - 252),
    y: Math.max(16, Math.min(domY - 36, rect.height - 164)),
    align: prefersLeft ? "left" : "right",
    title: point.title,
    color: `#${fill.toString(16).padStart(6, "0")}`,
    value: point.value,
    mou: point.mou,
    moa: point.moa,
    ia: point.ia,
  });
}

function animatePulseRing(ring: am5.Circle, radius: number) {
  ring.setAll({
    radius,
    scale: 1,
    strokeOpacity: 0.6,
  });

  ring.animate({
    key: "scale",
    from: 1,
    to: 2,
    duration: 600,
    easing: am5.ease.out(am5.ease.cubic),
  });
  ring.animate({
    key: "strokeOpacity",
    from: 0.6,
    to: 0,
    duration: 600,
    easing: am5.ease.out(am5.ease.cubic),
  });
}

function isTopBubble(point: PreparedPoint, points: PreparedPoint[]) {
  const topTitles = points
    .slice()
    .sort((a, b) => b.value - a.value)
    .slice(0, 3)
    .map((item) => item.title);

  return topTitles.includes(point.title);
}

function startBreathing(target: am5.Container) {
  const breatheIn = () => {
    target.animate({
      key: "scale",
      from: 1,
      to: 1.05,
      duration: 1000,
      easing: am5.ease.inOut(am5.ease.cubic),
    }).events.on("stopped", breatheOut);
  };

  const breatheOut = () => {
    target.animate({
      key: "scale",
      from: 1.05,
      to: 1,
      duration: 1000,
      easing: am5.ease.inOut(am5.ease.cubic),
    }).events.on("stopped", breatheIn);
  };

  breatheIn();
}