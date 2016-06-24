IMAGES = %W(
  lolitaface  clinica_sorriso
)

namespace :fix do

  desc 'Atualiza MDs antigos'
  task :update_mds do
   Dir["_posts/*.md"].each do |post_path|
    title = post_path.match(/(\w+)\.md/)[1]
    image_index = IMAGES.index{|s| s.include?(title)}
    if image_index
      puts "+ Fixing #{title} with image #{IMAGES[image_index]}"
      thumb = Asset.upload(Asset.full_path(IMAGES[image_index], 'thumb'))
      optimized = upload(Asset.full_path(IMAGES[image_index], 'optimized'))
      rewrite_file(post_path, thumb['url'], optimized['url'])
    else
      puts "- Skiping #{title}"
    end
   end

 end

end


def get_title(file_name)
  file_name.match(/(\w+)\.md/)[1]
end

def rewrite_file(post_path, thumb_url, optimized_url)
  text = File.read(post_path)
  cdn_info = "thumb_url: #{thumb_url}\noptimized_url: #{optimized_url}\nlink:"
  new_contents = text.gsub('link:', cdn_info)
  # puts new_contents
  File.open(post_path, "w") {|file| file.puts new_contents }
end
