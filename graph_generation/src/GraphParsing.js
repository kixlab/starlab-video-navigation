import React, { useState, useEffect } from 'react';


// sample data set
const actions = []

const tools = []

const ingredients = []



function GraphParsing({graph_data}) {
    const [processedData, SetProcessedData] = useState([]);

    useEffect (() => {
        parse_sequential_nodes(graph_data)
        SetProcessedData(graph_data)
      }, []);

    // 각 node별로 incoming, outgoing edge가 몇 개인지 
    // {in: ... , out: ...}
    const parse_edge_counts = (nodes, links) => {
        // make edge counts
        var edge_counts = []
        nodes.map((_, ind) => {
            edge_counts[ind] = {in: 0, out: 0}
        });
        links.map(link => {
            var source_node = link.source.split(".")[0]
            var target_node = link.target.split(".")[0]
            edge_counts[source_node].out += 1
            edge_counts[target_node].in += 1
        });
        console.log(edge_counts)
        return edge_counts
    }

    const parse_sequential_nodes = (graph_data) => {
        var nodes = graph_data.nodes
        var links = graph_data.links

        console.log(nodes)
        console.log(links)

        var edge_counts = parse_edge_counts(nodes, links)


        var left_edges = [...links]
        var left_nodes = [...nodes]

        var flag = 0
        var seq_node_list = []
        var tmp_seq_nodes = []

        var current_node = ''
        var previous_node = ''
        var current_node_ind = ''

        while(left_nodes.length != 0) {
            console.log(previous_node)

            // when the connection no longer made and need new starting point
            if (flag == 0) {
                current_node = left_nodes[0].id
                current_node_ind = current_node.split(".")[0]
                console.log(current_node)
            } else {
                current_node = links.find(link => link.source == previous_node).source
                // left_edges = left_edges.filter(e => e !== '')
                current_node_ind = current_node.split(".")[0]
                console.log(current_node)
            }
        
            previous_node = current_node
            const current_node_valid = edge_counts[current_node_ind].in <= 1 && edge_counts[current_node_ind].out <= 1
            left_nodes.splice(current_node_ind, 1)

            if (current_node_valid) {
                tmp_seq_nodes.push(current_node)
                flag = 1
            } else {
                seq_node_list.push(tmp_seq_nodes)
                tmp_seq_nodes = []
                flag = 0
            }
        }

        console.log(seq_node_list)





        // var ind = 0
        // var tmp_seq_nodes = []
        // while (true) {
        //     var source_node = links[ind].source.split(".")[0]
        //     var target_node = links[ind].target.split(".")[0]
        //     var source_valid = edge_counts[source_node].in <= 1 && edge_counts[source_node].out <= 1
        //     if (source_valid) {
        //         var seq_node = [source_valid]
        //         var target_valid = edge_counts[target_node].in <= 1 && edge_counts[target_node].out <= 1
        //     }

        // }
        // var seq_list = []
        // // indicated whether current node is source or target
        // var flag = 0

        // var left_edges = [...links]
        // var left_nodes = [...nodes]

        // var current_edge = left_links[0]
        // var current_node = current_edge.source.split(".")[0]

        // left_edges.splice(0, 1)
        // left_nodes.splice(current_node, 1)

        // var tmp_seq_nodes = []
        // while (left_links.length != 0) {
        //     var current_valid = edge_counts[current_node].in <= 1 && edge_counts[current_node].out <= 1

        //     // if current node is  target
        //     if (flag) {
        //         if (current_valid) {
        //             tmp_seq_nodes.push(current_node)
        //             current_node = left_edges.find(link => link.source.split('.')[0] == current_node)
        //             left_nodes.splice(current_node, 1)

        //             current_edge = 

        //             flag = 0
        //         }
        //         else {
        //             console.log(tmp_seq_nodes)
        //             seq_list.push(tmp_seq_nodes)
        //             tmp_seq_nodes = []
        //         }

        //     }
        //     else {
        //         if (current_valid) {
        //             tmp_seq_nodes.push(current_node)
        //             current_node = current_edge.target.split('.')[0]
        //             left_nodes.splice(current_node, 1)

        //             flag = 1
        //         } else {
        //             console.log(tmp_seq_nodes)
        //             seq_list.push(tmp_seq_nodes)
        //             tmp_seq_nodes = []
        //         }

        //     }

        // }


    }



    return (
        <div>
            123
        </div>
    )
}

export default GraphParsing;