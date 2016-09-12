IMAGES = %W(
  droido 7midias vigilantes sebrae_mei dpe_saed websat ferpamweb dpe_chronus dpe_plantao
  promocast lolita_moda_feminina dpe_intranet cha_bar clinica_sorriso droido_mascote bom_sabor
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
      fix_images(post_path, thumb['url'], optimized['url'])
    else
      puts "- Skiping #{title}"
    end
   end
 end


  desc 'Reseta todos os contadores de modais'
  task :modals do
   Dir["_posts/*.md"].each_with_index do |post_path, index|
      rewrite_file(post_path, 'modal_id', index)
   end
 end


end


def rewrite_file(post_path, attibute, value)
  text = File.read(post_path)
  new_content = text.gsub(/#{attibute}: \d+/, "#{attibute}: #{value}")
  File.open(post_path, "w") {|file| file.puts new_content }
end




def get_title(file_name)
  file_name.match(/(\w+)\.md/)[1]
end

def fix_images(post_path, thumb_url, optimized_url)
  text = File.read(post_path)
  cdn_info = "thumb_url: #{thumb_url}\noptimized_url: #{optimized_url}\nlink:"
  new_contents = text.gsub('link:', cdn_info)
  # puts new_contents
  File.open(post_path, "w") {|file| file.puts new_contents }
end
