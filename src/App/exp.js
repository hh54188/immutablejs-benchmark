const experiment = {
  experiments: [
    {
      id: "android_e1",
      owner_id: "wushuang",
      binary_id: "android",
      business_id: "topstory",
      handle_layer_id: "ardtop_layer_1",
      stage: 0,
      description: "this experiemnt 1 is used to ...",
      deadline: "2019-01-01T12:00:00+00:00",
      is_runtime: false,
      include_trigger_info: false,
      diversion_type: 0,
      conditions: [
        {
          profile_id: "Client.Platform",
          operator: "Eq",
          target_type: "Single",
          target_value: "Android"
        }
      ],
      use_params: [
        {
          experiment_id: "android_e1",
          handle_param_id: "android_bottom_bar_color"
        }
      ],
      envs: [
        {
          experiment_id: "android_e1",
          env_name: "in",
          is_overridable: false,
          is_primary: false,
          conditions: [
            {
              profile_id: "Network.ClientIp",
              operator: "Eq",
              target_type: "Single",
              target_value: "111.203.244.2"
            }
          ]
        },
        {
          experiment_id: "android_e1",
          env_name: "ex",
          is_overridable: true,
          is_primary: true,
          conditions: [
            {
              profile_id: "Network.ClientIp",
              operator: "NEq",
              target_type: "List",
              target_list: ["111.203.244.2"]
            }
          ]
        }
      ],
      groups: [
        {
          experiment_id: "android_e1",
          group_name: "1",
          is_control: true,
          apply_params: [
            {
              experiment_id: "android_e1",
              group_name: "1",
              handle_param_id: "android_bottom_bar_color",
              apply_value: "blue"
            }
          ]
        },
        {
          experiment_id: "android_e1",
          group_name: "2",
          is_control: false,
          apply_params: [
            {
              experiment_id: "android_e1",
              group_name: "2",
              handle_param_id: "android_bottom_bar_color",
              apply_value: "red"
            }
          ]
        }
      ],
      sizes: [
        {
          experiment_id: "android_e1",
          group_name: "1",
          env_name: "in",
          bucket_size: 0
        },
        {
          experiment_id: "android_e1",
          group_name: "2",
          env_name: "in",
          bucket_size: 1000
        },
        {
          experiment_id: "android_e1",
          group_name: "1",
          env_name: "ex",
          bucket_size: 200
        },
        {
          experiment_id: "android_e1",
          group_name: "2",
          env_name: "ex",
          bucket_size: 200
        }
      ]
    }
  ]
};

export default experiment;
