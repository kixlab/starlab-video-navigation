
# not used!!

import argparse
import io

from google.cloud import videointelligence


def analyze_shots(path):
    """ Detects camera shot changes. """
    # [START video_shot_tutorial_construct_request]
    video_client = videointelligence.VideoIntelligenceServiceClient()
    features = [videointelligence.Feature.SHOT_CHANGE_DETECTION]
    operation = video_client.annotate_video(
        request={"features": features, "input_uri": path}
    )
    # [END video_shot_tutorial_construct_request]
    print("\nProcessing video for shot change annotations:")

    # [START video_shot_tutorial_check_operation]
    result = operation.result(timeout=120)
    print("\nFinished processing.")

    # [END video_shot_tutorial_check_operation]

    # [START video_shot_tutorial_parse_response]
    for i, shot in enumerate(result.annotation_results[0].shot_annotations):
        start_time = (
            shot.start_time_offset.seconds + shot.start_time_offset.microseconds / 1e6
        )
        end_time = (
            shot.end_time_offset.seconds + shot.end_time_offset.microseconds / 1e6
        )
        print("\tShot {}: {} to {}".format(i, start_time, end_time))
    # [END video_shot_tutorial_parse_response]


if __name__ == "__main__":
    # [START video_shot_tutorial_run_application]
    parser = argparse.ArgumentParser(
        description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter
    )
    parser.add_argument("path", help="GCS path for shot change detection.")
    args = parser.parse_args()

    analyze_shots(args.path)

