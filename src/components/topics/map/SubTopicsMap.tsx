import { Box, Stack, Text } from '@chakra-ui/layout';
import * as d3Force from 'd3-force';
import { SimulationNodeDatum } from 'd3-force';
import * as d3Selection from 'd3-selection';
import * as d3Zoom from 'd3-zoom';
import { useEffect, useMemo, useRef } from 'react';
import { TopicLinkDataFragment } from '../../../graphql/topics/topics.fragments.generated';
import { BaseMap } from './BaseMap';
import {
  dragNode,
  drawTopicNode,
  getTopicNodeRadius,
  MapOptions,
  TopicNodeColors,
  TopicNodeElement,
} from './map.utils';
import { MapTopicDataFragment } from './map.utils.generated';
import { MapBackButton } from './MapBackButton';
import { MapSearchBox } from './MapSearchBox';

type NodeElement = TopicNodeElement & SimulationNodeDatum;

export const SubTopicsMap: React.FC<{
  topic?: MapTopicDataFragment; //only used to force rerendering
  subTopics: MapTopicDataFragment[];
  parentTopic?: TopicLinkDataFragment;
  options: MapOptions;
  onSelectTopic: (node: TopicLinkDataFragment) => void;
  onBack?: () => void;
}> = ({ topic, subTopics, parentTopic, options, onSelectTopic, onBack }) => {
  // Pretty important, otherwise the onClick callback will not use updated state
  const onTopicClick = useRef(onSelectTopic);

  useEffect(() => {
    onTopicClick.current = onSelectTopic;
  }, [onSelectTopic]);

  const d3Container = useRef<SVGSVGElement>(null);
  const topicNodeElements: NodeElement[] = useMemo(
    () =>
      subTopics.map((subTopic, idx) => {
        return {
          id: subTopic._id,
          ...subTopic,
          color: TopicNodeColors[idx % 9],
          size: subTopic.subTopicsTotalCount || undefined,
          radius: getTopicNodeRadius(subTopic, {
            defaultRadius: options.mode === 'explore' ? 15 : 12,
            coefficient: options.mode === 'explore' ? 0.9 : 0.7,
          }),
          clickable: true,
        };
      }),
    [subTopics]
  );

  useEffect(() => {
    if (d3Container && d3Container.current) {
      const svg = d3Selection
        .select(d3Container.current)
        .attr('viewBox', [0, 0, options.pxWidth, options.pxHeight].join(','));
      svg.selectAll('.innerContainer').remove();
      const container = svg.selectAll('.innerContainer').data([true]).join('g').classed('innerContainer', true);

      const topicNodes = drawTopicNode(container, topicNodeElements, 'topicNode', options).on('click', (event, n) => {
        onTopicClick.current(n);
      });

      const zoom = d3Zoom.zoom<SVGSVGElement, unknown>();
      const tick = () => {
        topicNodes.attr('transform', function (d) {
          return 'translate(' + d.x + ',' + d.y + ')';
        });
      };

      svg.call(
        zoom
          .extent([
            [0, 0],
            [options.pxWidth, options.pxHeight],
          ])
          .scaleExtent([0.6, 3])
          .on('zoom', function ({ transform }) {
            container.attr('transform', transform);
          })
      );

      const simulation = d3Force
        .forceSimulation<NodeElement>()
        .nodes(topicNodeElements)
        .alphaDecay(0.005)
        .force(
          'charge',
          d3Force.forceManyBody<NodeElement>().strength((d) => {
            const coefficient = options.mode === 'explore' ? 1 / 6 : 1 / 6;
            const s = -(d.radius * Math.log(d.radius)) * coefficient;
            return s;
          })
        )

        .force('center', d3Force.forceCenter(options.pxWidth / 2, options.pxHeight / 2).strength(1))
        .force('xForce', d3Force.forceX<NodeElement>((n) => options.pxWidth / 2).strength(0.005))
        .force('yForce', d3Force.forceY<NodeElement>((n) => options.pxHeight / 2).strength(0.005))
        .force(
          'collision',
          d3Force.forceCollide<NodeElement>().radius((n) => n.radius)
        )
        .on('tick', tick);

      // @ts-ignore
      topicNodes.call(dragNode(simulation));
    }
  }, [topic?._id, topicNodeElements.length]);

  if (!topicNodeElements.length)
    return (
      <BaseMap
        options={options}
        renderCenter={
          <Text fontWeight={600} fontSize="lg" color="gray.100" fontStyle="italic" textAlign="center">
            No SubTopics found
          </Text>
        }
        renderTopLeft={
          <Stack spacing="2px">
            {options.mode === 'explore' && <MapSearchBox onSelectTopic={onSelectTopic} />}
            {onBack && <MapBackButton onClick={onBack} />}
          </Stack>
        }
      />
    );
  return (
    <Box position="relative" width={`${options.pxWidth}px`} height={`${options.pxHeight}px`}>
      <BaseMap
        ref={d3Container}
        options={options}
        renderTopLeft={
          <Stack spacing="2px">
            {options.mode === 'explore' && <MapSearchBox onSelectTopic={onSelectTopic} />}
            {onBack && <MapBackButton onClick={onBack} />}
          </Stack>
        }
      />
    </Box>
  );
};
